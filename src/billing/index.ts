/**
 * @hanzo/sdk/billing — typed client for Hanzo Billing.
 *
 * Upstream Go service: https://github.com/hanzoai/billing
 *
 * Covers subscriptions, invoices, usage metering, and webhook
 * verification. Minimal scaffold today; surface fleshes out as
 * upstream stabilises.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface BillingConfig extends ServiceConfig {}

export interface Subscription {
  id: string
  customerId: string
  plan: string
  status: 'active' | 'past_due' | 'canceled' | 'paused'
  currentPeriodEnd: string
}

export interface Invoice {
  id: string
  customerId: string
  amountCents: number
  currency: string
  status: 'open' | 'paid' | 'void' | 'uncollectible'
  issuedAt: string
}

export class BillingClient extends BaseClient {
  constructor(cfg: BillingConfig) {
    super(cfg)
  }

  /** List subscriptions for a customer. */
  async listSubscriptions(customerId: string): Promise<Subscription[]> {
    return this.get<Subscription[]>('/v1/billing/subscriptions', {
      query: { customerId },
    })
  }

  /** List invoices for a customer. */
  async listInvoices(customerId: string): Promise<Invoice[]> {
    return this.get<Invoice[]>('/v1/billing/invoices', { query: { customerId } })
  }
}
