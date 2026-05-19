import { HanzoClient } from '../client'
import type { Region, Country, PaginatedResponse } from '../types'

/** Admin operations for regions. */
export class RegionAdmin {
  constructor(private client: HanzoClient) {}

  /** List regions with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Region>>('/admin/regions', query)
  }

  /** Get a region by ID. */
  get(id: string) {
    return this.client.get<Region>(`/admin/regions/${id}`)
  }

  /** Create a new region. */
  create(data: Partial<Region>) {
    return this.client.post<Region>('/admin/regions', data)
  }

  /** Update a region by ID. */
  update(id: string, data: Partial<Region>) {
    return this.client.put<Region>(`/admin/regions/${id}`, data)
  }

  /** Delete a region by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/regions/${id}`)
  }

  /** Add a country to a region. */
  addCountry(id: string, data: { countryCode: string }) {
    return this.client.post<Region>(`/admin/regions/${id}/countries`, data)
  }

  /** Remove a country from a region. */
  removeCountry(id: string, countryCode: string) {
    return this.client.delete<void>(`/admin/regions/${id}/countries/${countryCode}`)
  }

  /** List countries assigned to a region. */
  listCountries(id: string) {
    return this.client.get<PaginatedResponse<Country>>(`/admin/regions/${id}/countries`)
  }
}
