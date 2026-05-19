/**
 * @hanzo/sdk/kms — typed client for Hanzo KMS.
 *
 * Upstream Go service: https://github.com/hanzoai/kms
 *
 * Surface: secrets (fetch/set/list/remove), envelope encryption
 * (encrypt/decrypt), and the KMSSecret reconciler (K8s sync). Auth is
 * the same IAM-issued JWT used elsewhere; KMS validates the audience
 * claim against the caller's service identity.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface KMSConfig extends ServiceConfig {}

export interface SecretEntry {
  /** Hierarchical secret path, e.g. `hanzo/prod/api-key`. */
  path: string
  /** Cleartext secret value (server returns decrypted). */
  value: string
  /** Optional per-secret metadata. */
  metadata?: Record<string, string>
  createdAt?: string
  updatedAt?: string
  version?: number
}

export interface EncryptResult {
  /** Base64-encoded ciphertext. */
  ciphertext: string
  /** Key version used to encrypt (for rotation tracking). */
  keyVersion: number
}

export interface DecryptResult {
  /** Cleartext result. */
  plaintext: string
  /** Key version that produced the ciphertext. */
  keyVersion: number
}

export class KMSClient {
  readonly secrets: SecretsAPI
  readonly envelopes: EnvelopesAPI
  private readonly http: HealthHTTP

  constructor(cfg: KMSConfig) {
    this.secrets = new SecretsAPI(cfg)
    this.envelopes = new EnvelopesAPI(cfg)
    this.http = new HealthHTTP(cfg)
  }

  health(): Promise<{ status: string; uptime?: number }> {
    return this.http.health()
  }
}

class HealthHTTP extends BaseClient {
  health(): Promise<{ status: string; uptime?: number }> {
    return this.get('/healthz')
  }
}

class SecretsAPI extends BaseClient {
  /** List secrets under a path prefix. */
  list(prefix = ''): Promise<SecretEntry[]> {
    return this.get<SecretEntry[]>('/v1/kms/secrets', { query: { prefix } })
  }

  /** Fetch one secret by path. Throws HanzoAPIError(404) when missing. */
  fetch(path: string): Promise<SecretEntry> {
    return this.get<SecretEntry>(`/v1/kms/secrets/${encodeURIComponent(path)}`)
  }

  /**
   * Upsert a secret. Server idempotently writes; an explicit
   * `expectedVersion` triggers CAS (compare-and-set) to refuse
   * concurrent overwrites.
   */
  set(
    path: string,
    value: string,
    opts: { metadata?: Record<string, string>; expectedVersion?: number } = {},
  ): Promise<SecretEntry> {
    return this.put<SecretEntry>(`/v1/kms/secrets/${encodeURIComponent(path)}`, {
      body: {
        value,
        metadata: opts.metadata,
        expectedVersion: opts.expectedVersion,
      },
    })
  }

  /** Remove a secret. No-op when absent. */
  async remove(path: string): Promise<void> {
    await this.delete<unknown>(`/v1/kms/secrets/${encodeURIComponent(path)}`)
  }
}

class EnvelopesAPI extends BaseClient {
  /** Encrypt cleartext under the named key. */
  encrypt(keyId: string, plaintext: string): Promise<EncryptResult> {
    return this.post<EncryptResult>('/v1/kms/encrypt', { body: { keyId, plaintext } })
  }

  /** Decrypt a ciphertext blob. */
  decrypt(keyId: string, ciphertext: string): Promise<DecryptResult> {
    return this.post<DecryptResult>('/v1/kms/decrypt', { body: { keyId, ciphertext } })
  }
}
