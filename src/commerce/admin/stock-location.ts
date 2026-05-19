import { HanzoClient } from '../client'
import type { StockLocation, PaginatedResponse } from '../types'

/** Admin operations for stock locations. */
export class StockLocationAdmin {
  constructor(private client: HanzoClient) {}

  /** List stock locations with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<StockLocation>>('/admin/stock-locations', query)
  }

  /** Get a stock location by ID. */
  get(id: string) {
    return this.client.get<StockLocation>(`/admin/stock-locations/${id}`)
  }

  /** Create a new stock location. */
  create(data: Partial<StockLocation>) {
    return this.client.post<StockLocation>('/admin/stock-locations', data)
  }

  /** Update a stock location by ID. */
  update(id: string, data: Partial<StockLocation>) {
    return this.client.put<StockLocation>(`/admin/stock-locations/${id}`, data)
  }

  /** Delete a stock location by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/stock-locations/${id}`)
  }
}
