/**
 * @hanzo/sdk — Unified Hanzo TypeScript SDK.
 *
 * One install (`npm i @hanzo/sdk`) gives you typed clients for every
 * Hanzo service. Tree-shakable subpath imports keep bundle size to
 * what you actually use.
 *
 *   import { HanzoSDK } from '@hanzo/sdk'                  // umbrella
 *   import { IAMClient } from '@hanzo/sdk/iam'             // one service
 *   import { KMSClient } from '@hanzo/sdk/kms'
 *   import { CommerceClient } from '@hanzo/sdk/commerce'
 *
 * Every sub-module has its own README.md inside src/<service>/ and
 * its own subpath export listed in package.json#exports. Upstream
 * Go service repo + REST surface are linked at the top of each
 * service's README.
 *
 * Services covered (1:1 with the Go upstreams in github.com/hanzoai):
 *
 *   iam        — Identity, OIDC, OAuth2, applications, redirect URIs, users, orgs
 *   kms        — Secrets, keys, encrypt/decrypt, KMSSecret reconciler
 *   commerce   — Storefront + admin (products, carts, orders) — pre-existing
 *   billing    — Subscriptions, invoices, usage
 *   mpc        — Threshold signatures (CGGMP21, FROST)
 *   paas       — Deployments, environments, log streams
 *   team       — Team membership, roles, invites
 *   api        — Unified API gateway (auth pass-through, request signing)
 *
 * Adding a new service:
 *   1. mkdir src/<service> ; write client.ts + types.ts + index.ts + README.md
 *   2. Add a tsup entry for it in tsup.config.ts
 *   3. Add a subpath export to package.json
 *   4. Mount it on HanzoSDK below
 *
 * One way to do everything, composable, orthogonal, complete.
 */

export { IAMClient } from './iam'
export type { IAMConfig } from './iam'

export { KMSClient } from './kms'
export type { KMSConfig } from './kms'

export { CommerceClient } from './commerce'
export type { CommerceConfig } from './commerce'

export { BillingClient } from './billing'
export type { BillingConfig } from './billing'

export { MPCClient } from './mpc'
export type { MPCConfig } from './mpc'

export { PaaSClient } from './paas'
export type { PaaSConfig } from './paas'

export { TeamClient } from './team'
export type { TeamConfig } from './team'

export { APIClient } from './api'
export type { APIConfig } from './api'

export { HanzoAPIError } from './_shared/client'

import { IAMClient } from './iam'
import { KMSClient } from './kms'
import { CommerceClient } from './commerce'
import { BillingClient } from './billing'
import { MPCClient } from './mpc'
import { PaaSClient } from './paas'
import { TeamClient } from './team'
import { APIClient } from './api'

/**
 * Per-service base URL overrides. When unset, every service falls back to
 * `HanzoSDKConfig.baseUrl` (default `https://api.hanzo.ai`).
 */
export interface HanzoSDKServices {
  iam?: string
  kms?: string
  commerce?: string
  billing?: string
  mpc?: string
  paas?: string
  team?: string
  api?: string
}

export interface HanzoSDKConfig {
  /** Base URL for the Hanzo platform. Default: https://api.hanzo.ai */
  baseUrl?: string
  /** Bearer token sent on every authenticated request. */
  token?: string
  /** Per-service base URL overrides (when running against a specific env). */
  services?: HanzoSDKServices
  /** Custom fetch (for runtimes without global fetch, or for instrumentation). */
  fetch?: typeof globalThis.fetch
}

/**
 * HanzoSDK — top-level umbrella client. Mounts every service under one config.
 *
 * ```ts
 * const hanzo = new HanzoSDK({ token: process.env.HANZO_API_KEY })
 *
 * const apps  = await hanzo.iam.applications.list({ owner: 'liquidity' })
 * await hanzo.iam.applications.redirectURIs.add('vcc-exchange-client-id', [
 *   'http://vcc.localhost:3000/auth/callback',
 * ])
 * const secret = await hanzo.kms.secrets.get('hanzo/prod/api-key')
 * ```
 */
export class HanzoSDK {
  readonly iam: IAMClient
  readonly kms: KMSClient
  readonly commerce: CommerceClient
  readonly billing: BillingClient
  readonly mpc: MPCClient
  readonly paas: PaaSClient
  readonly team: TeamClient
  readonly api: APIClient

  constructor(cfg: HanzoSDKConfig = {}) {
    const defaultBase = cfg.baseUrl ?? 'https://api.hanzo.ai'
    const base = (svc: keyof HanzoSDKServices): string =>
      cfg.services?.[svc] ?? defaultBase
    const common = { token: cfg.token, fetch: cfg.fetch }

    this.iam = new IAMClient({ ...common, baseUrl: base('iam') })
    this.kms = new KMSClient({ ...common, baseUrl: base('kms') })
    this.commerce = new CommerceClient({ ...common, baseUrl: base('commerce') })
    this.billing = new BillingClient({ ...common, baseUrl: base('billing') })
    this.mpc = new MPCClient({ ...common, baseUrl: base('mpc') })
    this.paas = new PaaSClient({ ...common, baseUrl: base('paas') })
    this.team = new TeamClient({ ...common, baseUrl: base('team') })
    this.api = new APIClient({ ...common, baseUrl: base('api') })
  }
}

export default HanzoSDK
