import { HanzoClient } from '../client'
import type { Order, Payment, Return, PaginatedResponse } from '../types'

/** Admin operations for orders. */
export class OrderAdmin {
  constructor(private client: HanzoClient) {}

  /** List orders with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Order>>('/admin/orders', query)
  }

  /** Get an order by ID. */
  get(id: string) {
    return this.client.get<Order>(`/admin/orders/${id}`)
  }

  /** Create a new order. */
  create(data: Partial<Order>) {
    return this.client.post<Order>('/admin/orders', data)
  }

  /** Update an order by ID. */
  update(id: string, data: Partial<Order>) {
    return this.client.put<Order>(`/admin/orders/${id}`, data)
  }

  /** Delete an order by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/orders/${id}`)
  }

  /** Authorize payment for an order. */
  authorize(id: string, data?: Record<string, unknown>) {
    return this.client.post<Order>(`/admin/orders/${id}/authorize`, data)
  }

  /** Capture an authorized payment for an order. */
  capture(id: string, data?: { amount?: number }) {
    return this.client.post<Order>(`/admin/orders/${id}/capture`, data)
  }

  /** Charge (authorize + capture) payment for an order. */
  charge(id: string, data?: { amount?: number }) {
    return this.client.post<Order>(`/admin/orders/${id}/charge`, data)
  }

  /** Refund a captured payment for an order. */
  refund(id: string, data: { amount: number; reason?: string }) {
    return this.client.post<Order>(`/admin/orders/${id}/refund`, data)
  }

  /** List payments associated with an order. */
  payments(id: string) {
    return this.client.get<PaginatedResponse<Payment>>(`/admin/orders/${id}/payments`)
  }

  /** List returns associated with an order. */
  returns(id: string) {
    return this.client.get<PaginatedResponse<Return>>(`/admin/orders/${id}/returns`)
  }

  /** Update order status. */
  status(id: string, data: { status: Order['status'] }) {
    return this.client.post<Order>(`/admin/orders/${id}/status`, data)
  }
}
