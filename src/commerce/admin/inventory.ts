import { HanzoClient } from '../client'
import type { InventoryItem, InventoryLevel, Reservation, PaginatedResponse } from '../types'

/** Admin operations for inventory items. */
export class InventoryItemAdmin {
  constructor(private client: HanzoClient) {}

  /** List inventory items with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<InventoryItem>>('/admin/inventory-items', query)
  }

  /** Get an inventory item by ID. */
  get(id: string) {
    return this.client.get<InventoryItem>(`/admin/inventory-items/${id}`)
  }

  /** Create a new inventory item. */
  create(data: Partial<InventoryItem>) {
    return this.client.post<InventoryItem>('/admin/inventory-items', data)
  }

  /** Update an inventory item by ID. */
  update(id: string, data: Partial<InventoryItem>) {
    return this.client.put<InventoryItem>(`/admin/inventory-items/${id}`, data)
  }

  /** Delete an inventory item by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/inventory-items/${id}`)
  }
}

/** Admin operations for inventory levels. */
export class InventoryLevelAdmin {
  constructor(private client: HanzoClient) {}

  /** List inventory levels with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<InventoryLevel>>('/admin/inventory-levels', query)
  }

  /** Get an inventory level by ID. */
  get(id: string) {
    return this.client.get<InventoryLevel>(`/admin/inventory-levels/${id}`)
  }

  /** Create a new inventory level. */
  create(data: Partial<InventoryLevel>) {
    return this.client.post<InventoryLevel>('/admin/inventory-levels', data)
  }

  /** Update an inventory level. */
  update(id: string, data: Partial<InventoryLevel>) {
    return this.client.put<InventoryLevel>(`/admin/inventory-levels/${id}`, data)
  }

  /** Delete an inventory level. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/inventory-levels/${id}`)
  }

  /** Adjust stock quantity for an inventory level. */
  adjustStock(id: string, data: { quantity: number; locationId: string }) {
    return this.client.post<InventoryLevel>(`/admin/inventory-levels/${id}/adjust`, data)
  }
}

/** Admin operations for inventory reservations. */
export class ReservationAdmin {
  constructor(private client: HanzoClient) {}

  /** List reservations with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Reservation>>('/admin/reservations', query)
  }

  /** Get a reservation by ID. */
  get(id: string) {
    return this.client.get<Reservation>(`/admin/reservations/${id}`)
  }

  /** Create a new reservation. */
  create(data: Partial<Reservation>) {
    return this.client.post<Reservation>('/admin/reservations', data)
  }

  /** Update a reservation by ID. */
  update(id: string, data: Partial<Reservation>) {
    return this.client.put<Reservation>(`/admin/reservations/${id}`, data)
  }

  /** Delete a reservation by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/reservations/${id}`)
  }
}
