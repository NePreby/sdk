import { HanzoClient } from '../client'
import type { ApiKey, PaginatedResponse } from '../types'

/** Admin operations for API keys. */
export class ApiKeyAdmin {
  constructor(private client: HanzoClient) {}

  /** List API keys with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<ApiKey>>('/admin/api-keys', query)
  }

  /** Get an API key by ID. */
  get(id: string) {
    return this.client.get<ApiKey>(`/admin/api-keys/${id}`)
  }

  /** Create a new API key. */
  create(data: { title: string; type: 'publishable' | 'secret' }) {
    return this.client.post<ApiKey>('/admin/api-keys', data)
  }

  /** Revoke an API key. */
  revoke(id: string) {
    return this.client.post<ApiKey>(`/admin/api-keys/${id}/revoke`)
  }
}
