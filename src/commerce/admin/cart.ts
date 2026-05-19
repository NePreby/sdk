import { HanzoClient } from '../client'
import type { Cart, PaginatedResponse } from '../types'

/** Admin operations for carts. */
export class CartAdmin {
  constructor(private client: HanzoClient) {}

  /** List carts with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Cart>>('/admin/carts', query)
  }

  /** Get a cart by ID. */
  get(id: string) {
    return this.client.get<Cart>(`/admin/carts/${id}`)
  }

  /** Create a new cart. */
  create(data: Partial<Cart>) {
    return this.client.post<Cart>('/admin/carts', data)
  }

  /** Update a cart by ID. */
  update(id: string, data: Partial<Cart>) {
    return this.client.put<Cart>(`/admin/carts/${id}`, data)
  }

  /** Delete a cart by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/carts/${id}`)
  }
}
