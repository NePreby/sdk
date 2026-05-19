import { HanzoClient } from '../client'
import type { Collection, PaginatedResponse } from '../types'

/** Admin operations for collections. */
export class CollectionAdmin {
  constructor(private client: HanzoClient) {}

  /** List collections with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Collection>>('/admin/collections', query)
  }

  /** Get a collection by ID. */
  get(id: string) {
    return this.client.get<Collection>(`/admin/collections/${id}`)
  }

  /** Create a new collection. */
  create(data: Partial<Collection>) {
    return this.client.post<Collection>('/admin/collections', data)
  }

  /** Update a collection by ID. */
  update(id: string, data: Partial<Collection>) {
    return this.client.put<Collection>(`/admin/collections/${id}`, data)
  }

  /** Delete a collection by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/collections/${id}`)
  }
}
