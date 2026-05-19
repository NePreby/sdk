import { HanzoClient } from '../client'
import type { Collection, PaginatedResponse } from '../types'

/** Public storefront operations for collections. */
export class CollectionStore {
  constructor(private client: HanzoClient) {}

  /** List collections with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Collection>>('/store/collections', query)
  }

  /** Get a collection by ID or handle. */
  get(idOrHandle: string) {
    return this.client.get<Collection>(`/store/collections/${idOrHandle}`)
  }
}
