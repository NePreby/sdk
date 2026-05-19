import { HanzoClient } from '../client'
import type {
  Fulfillment,
  FulfillmentSet,
  ServiceZone,
  GeoZone,
  ShippingOption,
  ShippingProfile,
  PaginatedResponse,
} from '../types'

/** Admin operations for fulfillments. */
export class FulfillmentAdmin {
  constructor(private client: HanzoClient) {}

  /** List fulfillments with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Fulfillment>>('/admin/fulfillments', query)
  }

  /** Get a fulfillment by ID. */
  get(id: string) {
    return this.client.get<Fulfillment>(`/admin/fulfillments/${id}`)
  }

  /** Create a new fulfillment. */
  create(data: Partial<Fulfillment>) {
    return this.client.post<Fulfillment>('/admin/fulfillments', data)
  }

  /** Update a fulfillment by ID. */
  update(id: string, data: Partial<Fulfillment>) {
    return this.client.put<Fulfillment>(`/admin/fulfillments/${id}`, data)
  }

  /** Delete a fulfillment by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/fulfillments/${id}`)
  }

  /** Mark a fulfillment as shipped. */
  ship(id: string, data?: { trackingLinks?: Array<{ url?: string; trackingNumber: string }> }) {
    return this.client.post<Fulfillment>(`/admin/fulfillments/${id}/ship`, data)
  }

  /** Cancel a fulfillment. */
  cancel(id: string) {
    return this.client.post<Fulfillment>(`/admin/fulfillments/${id}/cancel`)
  }
}

/** Admin operations for fulfillment sets. */
export class FulfillmentSetAdmin {
  constructor(private client: HanzoClient) {}

  /** List fulfillment sets. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<FulfillmentSet>>('/admin/fulfillment-sets', query)
  }

  /** Get a fulfillment set by ID. */
  get(id: string) {
    return this.client.get<FulfillmentSet>(`/admin/fulfillment-sets/${id}`)
  }

  /** Create a new fulfillment set. */
  create(data: Partial<FulfillmentSet>) {
    return this.client.post<FulfillmentSet>('/admin/fulfillment-sets', data)
  }

  /** Update a fulfillment set. */
  update(id: string, data: Partial<FulfillmentSet>) {
    return this.client.put<FulfillmentSet>(`/admin/fulfillment-sets/${id}`, data)
  }

  /** Delete a fulfillment set. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/fulfillment-sets/${id}`)
  }
}

/** Admin operations for service zones. */
export class ServiceZoneAdmin {
  constructor(private client: HanzoClient) {}

  /** List service zones for a fulfillment set. */
  list(fulfillmentSetId: string, query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<ServiceZone>>(
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones`,
      query,
    )
  }

  /** Get a service zone by ID. */
  get(fulfillmentSetId: string, id: string) {
    return this.client.get<ServiceZone>(
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones/${id}`,
    )
  }

  /** Create a service zone in a fulfillment set. */
  create(fulfillmentSetId: string, data: Partial<ServiceZone>) {
    return this.client.post<ServiceZone>(
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones`,
      data,
    )
  }

  /** Update a service zone. */
  update(fulfillmentSetId: string, id: string, data: Partial<ServiceZone>) {
    return this.client.put<ServiceZone>(
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones/${id}`,
      data,
    )
  }

  /** Delete a service zone. */
  delete(fulfillmentSetId: string, id: string) {
    return this.client.delete<void>(
      `/admin/fulfillment-sets/${fulfillmentSetId}/service-zones/${id}`,
    )
  }
}

/** Admin operations for geo zones. */
export class GeoZoneAdmin {
  constructor(private client: HanzoClient) {}

  /** List geo zones for a service zone. */
  list(serviceZoneId: string, query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<GeoZone>>(
      `/admin/service-zones/${serviceZoneId}/geo-zones`,
      query,
    )
  }

  /** Get a geo zone by ID. */
  get(serviceZoneId: string, id: string) {
    return this.client.get<GeoZone>(
      `/admin/service-zones/${serviceZoneId}/geo-zones/${id}`,
    )
  }

  /** Create a geo zone. */
  create(serviceZoneId: string, data: Partial<GeoZone>) {
    return this.client.post<GeoZone>(
      `/admin/service-zones/${serviceZoneId}/geo-zones`,
      data,
    )
  }

  /** Delete a geo zone. */
  delete(serviceZoneId: string, id: string) {
    return this.client.delete<void>(
      `/admin/service-zones/${serviceZoneId}/geo-zones/${id}`,
    )
  }
}

/** Admin operations for shipping options. */
export class ShippingOptionAdmin {
  constructor(private client: HanzoClient) {}

  /** List shipping options. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<ShippingOption>>('/admin/shipping-options', query)
  }

  /** Get a shipping option by ID. */
  get(id: string) {
    return this.client.get<ShippingOption>(`/admin/shipping-options/${id}`)
  }

  /** Create a shipping option. */
  create(data: Partial<ShippingOption>) {
    return this.client.post<ShippingOption>('/admin/shipping-options', data)
  }

  /** Update a shipping option. */
  update(id: string, data: Partial<ShippingOption>) {
    return this.client.put<ShippingOption>(`/admin/shipping-options/${id}`, data)
  }

  /** Delete a shipping option. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/shipping-options/${id}`)
  }
}

/** Admin operations for shipping profiles. */
export class ShippingProfileAdmin {
  constructor(private client: HanzoClient) {}

  /** List shipping profiles. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<ShippingProfile>>('/admin/shipping-profiles', query)
  }

  /** Get a shipping profile by ID. */
  get(id: string) {
    return this.client.get<ShippingProfile>(`/admin/shipping-profiles/${id}`)
  }

  /** Create a shipping profile. */
  create(data: Partial<ShippingProfile>) {
    return this.client.post<ShippingProfile>('/admin/shipping-profiles', data)
  }

  /** Update a shipping profile. */
  update(id: string, data: Partial<ShippingProfile>) {
    return this.client.put<ShippingProfile>(`/admin/shipping-profiles/${id}`, data)
  }

  /** Delete a shipping profile. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/shipping-profiles/${id}`)
  }
}
