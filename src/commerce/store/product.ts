import { HanzoClient } from '../client'
import type { Product, PaginatedResponse } from '../types'

/** Public storefront operations for products. */
export class ProductStore {
  constructor(private client: HanzoClient) {}

  /** List products with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Product>>('/store/products', query)
  }

  /** Get a product by ID or handle. */
  get(idOrHandle: string) {
    return this.client.get<Product>(`/store/products/${idOrHandle}`)
  }

  /** Search products by keyword. */
  search(query: string, filters?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Product>>('/store/products/search', {
      q: query,
      ...filters,
    })
  }
}
