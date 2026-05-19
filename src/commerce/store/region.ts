import { HanzoClient } from '../client'
import type { Region, PaginatedResponse } from '../types'

/** Public storefront operations for regions. */
export class RegionStore {
  constructor(private client: HanzoClient) {}

  /** List available regions and their currency info. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Region>>('/store/regions', query)
  }

  /** Get a region by ID. */
  get(id: string) {
    return this.client.get<Region>(`/store/regions/${id}`)
  }
}
