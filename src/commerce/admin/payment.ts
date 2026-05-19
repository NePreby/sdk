import { HanzoClient } from '../client'
import type { Payment, PaginatedResponse } from '../types'

/** Admin operations for payments. */
export class PaymentAdmin {
  constructor(private client: HanzoClient) {}

  /** List payments with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Payment>>('/admin/payments', query)
  }

  /** Get a payment by ID. */
  get(id: string) {
    return this.client.get<Payment>(`/admin/payments/${id}`)
  }

  /** Refund a payment. */
  refund(id: string, data?: { amount?: number; reason?: string }) {
    return this.client.post<Payment>(`/admin/payments/${id}/refund`, data)
  }
}
