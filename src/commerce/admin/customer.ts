import { HanzoClient } from '../client'
import type { Customer, PaginatedResponse } from '../types'

/** Admin operations for customers. */
export class CustomerAdmin {
  constructor(private client: HanzoClient) {}

  /** List customers with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Customer>>('/admin/customers', query)
  }

  /** Get a customer by ID. */
  get(id: string) {
    return this.client.get<Customer>(`/admin/customers/${id}`)
  }

  /** Create a new customer. */
  create(data: Partial<Customer>) {
    return this.client.post<Customer>('/admin/customers', data)
  }

  /** Update a customer by ID. */
  update(id: string, data: Partial<Customer>) {
    return this.client.put<Customer>(`/admin/customers/${id}`, data)
  }

  /** Delete a customer by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/customers/${id}`)
  }
}
