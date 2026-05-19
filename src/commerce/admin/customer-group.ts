import { HanzoClient } from '../client'
import type { CustomerGroup, Customer, PaginatedResponse } from '../types'

/** Admin operations for customer groups. */
export class CustomerGroupAdmin {
  constructor(private client: HanzoClient) {}

  /** List customer groups with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<CustomerGroup>>('/admin/customer-groups', query)
  }

  /** Get a customer group by ID. */
  get(id: string) {
    return this.client.get<CustomerGroup>(`/admin/customer-groups/${id}`)
  }

  /** Create a new customer group. */
  create(data: Partial<CustomerGroup>) {
    return this.client.post<CustomerGroup>('/admin/customer-groups', data)
  }

  /** Update a customer group by ID. */
  update(id: string, data: Partial<CustomerGroup>) {
    return this.client.put<CustomerGroup>(`/admin/customer-groups/${id}`, data)
  }

  /** Delete a customer group by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/customer-groups/${id}`)
  }

  /** Add a customer to a group. */
  addMember(id: string, data: { customerId: string }) {
    return this.client.post<CustomerGroup>(`/admin/customer-groups/${id}/members`, data)
  }

  /** Remove a customer from a group. */
  removeMember(id: string, customerId: string) {
    return this.client.delete<void>(`/admin/customer-groups/${id}/members/${customerId}`)
  }

  /** List customers in a group. */
  listMembers(id: string, query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Customer>>(
      `/admin/customer-groups/${id}/members`,
      query,
    )
  }
}
