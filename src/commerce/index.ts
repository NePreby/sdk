/**
 * @hanzo/sdk/commerce — re-export of the original @hanzo/sdk commerce
 * surface (admin + store + auth), preserved verbatim under a service
 * subpath so the umbrella SDK has a uniform shape.
 *
 * Upstream Go service: https://github.com/hanzoai/commerce
 */

import { HanzoClient, HanzoClientConfig } from './client'
import { Admin } from './admin'
import { Store } from './store'
import { Auth } from './auth'

export { HanzoClient } from './client'
export type { HanzoClientConfig } from './client'
export { Admin } from './admin'
export { Store } from './store'
export { Auth } from './auth'
export * from './types'

export interface CommerceConfig extends HanzoClientConfig {}

/**
 * CommerceClient — drop-in replacement for the old HanzoSDK shape.
 * Lives at `@hanzo/sdk/commerce` so the umbrella SDK can mount it
 * uniformly with iam/kms/billing/etc.
 */
export class CommerceClient {
  readonly client: HanzoClient
  readonly admin: Admin
  readonly store: Store
  readonly auth: Auth

  constructor(cfg: CommerceConfig) {
    this.client = new HanzoClient(cfg)
    this.admin = new Admin(this.client)
    this.store = new Store(this.client)
    this.auth = new Auth(this.client)
  }
}
