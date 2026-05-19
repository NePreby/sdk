import { HanzoClient } from '../client'
import type { Customer, Order, Address, PaginatedResponse } from '../types'

/** Public storefront operations for authenticated customers. */
export class CustomerStore {
  constructor(private client: HanzoClient) {}

  /** Get the current customer's profile. */
  getProfile() {
    return this.client.get<Customer>('/store/customers/me')
  }

  /** Update the current customer's profile. */
  updateProfile(data: Partial<Customer>) {
    return this.client.put<Customer>('/store/customers/me', data)
  }

  /** List the current customer's orders. */
  listOrders(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Order>>('/store/customers/me/orders', query)
  }

  /** Get a specific order for the current customer. */
  getOrder(orderId: string) {
    return this.client.get<Order>(`/store/customers/me/orders/${orderId}`)
  }

  /** List the current customer's addresses. */
  listAddresses(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Address>>('/store/customers/me/addresses', query)
  }

  /** Add an address for the current customer. */
  addAddress(data: Partial<Address>) {
    return this.client.post<Address>('/store/customers/me/addresses', data)
  }

  /** Update an address for the current customer. */
  updateAddress(addressId: string, data: Partial<Address>) {
    return this.client.put<Address>(`/store/customers/me/addresses/${addressId}`, data)
  }

  /** Delete an address for the current customer. */
  deleteAddress(addressId: string) {
    return this.client.delete<void>(`/store/customers/me/addresses/${addressId}`)
  }
}
