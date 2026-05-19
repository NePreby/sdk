/**
 * @hanzo/sdk/api — typed client for the Hanzo unified API gateway.
 *
 * Upstream Go service: https://github.com/hanzoai/api
 *
 * Generic REST passthrough with platform auth + tenant header
 * injection. Use this for services that don't have a dedicated
 * sub-client in this SDK yet.
 */

import { BaseClient, ServiceConfig, RequestOptions } from '../_shared/client'

export interface APIConfig extends ServiceConfig {}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class APIClient extends BaseClient {
  constructor(cfg: APIConfig) {
    super(cfg)
  }

  /**
   * Issue an arbitrary HTTP request through the Hanzo gateway. Adds the
   * platform auth header + tenant injection; otherwise a thin wrapper
   * around fetch. Use for services not yet wrapped by a dedicated
   * sub-client in this SDK.
   */
  call<T = unknown>(method: HTTPMethod, path: string, opts: RequestOptions = {}): Promise<T> {
    switch (method) {
      case 'GET':
        return this.get<T>(path, opts)
      case 'POST':
        return this.post<T>(path, opts)
      case 'PUT':
        return this.put<T>(path, opts)
      case 'PATCH':
        return this.patch<T>(path, opts)
      case 'DELETE':
        return this.delete<T>(path, opts)
    }
  }
}
