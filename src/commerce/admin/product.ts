import { HanzoClient } from '../client'
import type { Product, PaginatedResponse } from '../types'

/** Admin operations for products. */
export class ProductAdmin {
  constructor(private client: HanzoClient) {}

  /** List products with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Product>>('/admin/products', query)
  }

  /** Get a product by ID. */
  get(id: string) {
    return this.client.get<Product>(`/admin/products/${id}`)
  }

  /** Create a new product. */
  create(data: Partial<Product>) {
    return this.client.post<Product>('/admin/products', data)
  }

  /** Update a product by ID. */
  update(id: string, data: Partial<Product>) {
    return this.client.put<Product>(`/admin/products/${id}`, data)
  }

  /** Delete a product by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/products/${id}`)
  }
}
