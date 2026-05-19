/**
 * @hanzo/sdk/paas — typed client for Hanzo PaaS.
 *
 * Upstream Go service: https://github.com/hanzoai/paas
 *
 * Deploy targets, environments, K8s rollout. Minimal scaffold.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface PaaSConfig extends ServiceConfig {}

export interface Deployment {
  id: string
  app: string
  environment: 'dev' | 'test' | 'main' | string
  image: string
  status: 'pending' | 'rolling' | 'ready' | 'failed'
  createdAt: string
}

export class PaaSClient extends BaseClient {
  constructor(cfg: PaaSConfig) {
    super(cfg)
  }

  async listDeployments(opts: { app?: string; environment?: string } = {}): Promise<Deployment[]> {
    return this.get<Deployment[]>('/v1/paas/deployments', { query: opts })
  }

  /** Trigger a rolling deploy. Idempotent on (app, environment, image). */
  async deploy(args: {
    app: string
    environment: string
    image: string
  }): Promise<Deployment> {
    return this.post<Deployment>('/v1/paas/deployments', { body: args })
  }
}
