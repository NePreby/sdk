/**
 * @hanzo/sdk/mpc — typed client for Hanzo MPC (threshold signing).
 *
 * Upstream Go service: https://github.com/hanzoai/mpc
 *
 * Threshold signatures via CGGMP21 (secp256k1 ECDSA) and FROST
 * (Ed25519). Minimal scaffold; flesh out as MPC's REST API stabilises.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface MPCConfig extends ServiceConfig {}

export type KeyType = 'secp256k1' | 'ed25519'

export interface MPCWallet {
  id: string
  keyType: KeyType
  threshold: number
  parties: number
  publicKey: string
  createdAt: string
}

export interface SignRequest {
  walletId: string
  payloadHash: string // 32-byte hex (Keccak / SHA-256)
  intent: 'transfer' | 'mint' | 'burn' | 'settle_trade' | 'compliance_claim'
  idempotencyKey: string
}

export interface SignResponse {
  signature: string // 65-byte hex (r||s||v for ECDSA, 64-byte for Ed25519)
  sessionId: string
  approvalId: string
}

export class MPCClient extends BaseClient {
  constructor(cfg: MPCConfig) {
    super(cfg)
  }

  /** List threshold wallets owned by the caller. */
  async listWallets(): Promise<MPCWallet[]> {
    return this.get<MPCWallet[]>('/v1/mpc/wallets')
  }

  /** Request a threshold signature. Blocks until the round completes. */
  async sign(req: SignRequest): Promise<SignResponse> {
    return this.post<SignResponse>('/v1/mpc/sign', { body: req })
  }
}
