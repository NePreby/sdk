import { HanzoClient } from '../client'
import type { Subscription, PaginatedResponse } from '../types'

/** Admin operations for subscriptions. */
export class SubscriptionAdmin {
  constructor(private client: HanzoClient) {}

  /** List subscriptions with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Subscription>>('/admin/subscriptions', query)
  }

  /** Get a subscription by ID. */
  get(id: string) {
    return this.client.get<Subscription>(`/admin/subscriptions/${id}`)
  }

  /** Create a new subscription. */
  create(data: Partial<Subscription>) {
    return this.client.post<Subscription>('/admin/subscriptions', data)
  }

  /** Update a subscription by ID. */
  update(id: string, data: Partial<Subscription>) {
    return this.client.put<Subscription>(`/admin/subscriptions/${id}`, data)
  }

  /** Cancel a subscription. */
  cancel(id: string) {
    return this.client.post<Subscription>(`/admin/subscriptions/${id}/cancel`)
  }
}
