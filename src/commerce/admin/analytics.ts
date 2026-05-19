import { HanzoClient } from '../client'
import type { AnalyticsEvent, AnalyticsQuery, AnalyticsResult } from '../types'

/** Admin operations for analytics. */
export class AnalyticsAdmin {
  constructor(private client: HanzoClient) {}

  /** Ingest analytics events. */
  events(data: AnalyticsEvent[]) {
    return this.client.post<void>('/admin/analytics/events', { events: data })
  }

  /** Query analytics data. */
  query(data: AnalyticsQuery) {
    return this.client.post<AnalyticsResult>('/admin/analytics/query', data)
  }
}
