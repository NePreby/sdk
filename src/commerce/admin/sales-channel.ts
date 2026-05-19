import { HanzoClient } from '../client'
import type { SalesChannel, PaginatedResponse } from '../types'

/** Admin operations for sales channels. */
export class SalesChannelAdmin {
  constructor(private client: HanzoClient) {}

  /** List sales channels with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<SalesChannel>>('/admin/sales-channels', query)
  }

  /** Get a sales channel by ID. */
  get(id: string) {
    return this.client.get<SalesChannel>(`/admin/sales-channels/${id}`)
  }

  /** Create a new sales channel. */
  create(data: Partial<SalesChannel>) {
    return this.client.post<SalesChannel>('/admin/sales-channels', data)
  }

  /** Update a sales channel by ID. */
  update(id: string, data: Partial<SalesChannel>) {
    return this.client.put<SalesChannel>(`/admin/sales-channels/${id}`, data)
  }

  /** Delete a sales channel by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/sales-channels/${id}`)
  }
}
