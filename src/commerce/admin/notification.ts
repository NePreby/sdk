import { HanzoClient } from '../client'
import type { Notification, PaginatedResponse } from '../types'

/** Admin operations for notifications. */
export class NotificationAdmin {
  constructor(private client: HanzoClient) {}

  /** List notifications with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Notification>>('/admin/notifications', query)
  }

  /** Get a notification by ID. */
  get(id: string) {
    return this.client.get<Notification>(`/admin/notifications/${id}`)
  }

  /** Create a new notification. */
  create(data: Partial<Notification>) {
    return this.client.post<Notification>('/admin/notifications', data)
  }

  /** Resend a notification. */
  resend(id: string) {
    return this.client.post<Notification>(`/admin/notifications/${id}/resend`)
  }
}
