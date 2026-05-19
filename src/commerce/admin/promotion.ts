import { HanzoClient } from '../client'
import type {
  Promotion,
  PromotionRule,
  ApplicationMethod,
  CampaignBudget,
  PaginatedResponse,
} from '../types'

/** Admin operations for promotions. */
export class PromotionAdmin {
  constructor(private client: HanzoClient) {}

  /** List promotions with optional query filters. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Promotion>>('/admin/promotions', query)
  }

  /** Get a promotion by ID. */
  get(id: string) {
    return this.client.get<Promotion>(`/admin/promotions/${id}`)
  }

  /** Create a new promotion. */
  create(data: Partial<Promotion>) {
    return this.client.post<Promotion>('/admin/promotions', data)
  }

  /** Update a promotion by ID. */
  update(id: string, data: Partial<Promotion>) {
    return this.client.put<Promotion>(`/admin/promotions/${id}`, data)
  }

  /** Delete a promotion by ID. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/promotions/${id}`)
  }

  /** Add a rule to a promotion. */
  addRule(id: string, data: Partial<PromotionRule>) {
    return this.client.post<Promotion>(`/admin/promotions/${id}/rules`, data)
  }

  /** Remove a rule from a promotion. */
  removeRule(id: string, ruleId: string) {
    return this.client.delete<void>(`/admin/promotions/${id}/rules/${ruleId}`)
  }

  /** Evaluate a promotion against a cart or context. */
  evaluate(data: { promotionId: string; context: Record<string, unknown> }) {
    return this.client.post<{ applicable: boolean; discount?: number }>(
      '/admin/promotions/evaluate',
      data,
    )
  }
}

/** Admin operations for application methods. */
export class ApplicationMethodAdmin {
  constructor(private client: HanzoClient) {}

  /** List application methods. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<ApplicationMethod>>(
      '/admin/application-methods',
      query,
    )
  }

  /** Get an application method by ID. */
  get(id: string) {
    return this.client.get<ApplicationMethod>(`/admin/application-methods/${id}`)
  }

  /** Create an application method. */
  create(data: Partial<ApplicationMethod>) {
    return this.client.post<ApplicationMethod>('/admin/application-methods', data)
  }

  /** Update an application method. */
  update(id: string, data: Partial<ApplicationMethod>) {
    return this.client.put<ApplicationMethod>(`/admin/application-methods/${id}`, data)
  }

  /** Delete an application method. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/application-methods/${id}`)
  }
}

/** Admin operations for campaign budgets. */
export class CampaignBudgetAdmin {
  constructor(private client: HanzoClient) {}

  /** List campaign budgets. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<CampaignBudget>>('/admin/campaign-budgets', query)
  }

  /** Get a campaign budget by ID. */
  get(id: string) {
    return this.client.get<CampaignBudget>(`/admin/campaign-budgets/${id}`)
  }

  /** Create a campaign budget. */
  create(data: Partial<CampaignBudget>) {
    return this.client.post<CampaignBudget>('/admin/campaign-budgets', data)
  }

  /** Update a campaign budget. */
  update(id: string, data: Partial<CampaignBudget>) {
    return this.client.put<CampaignBudget>(`/admin/campaign-budgets/${id}`, data)
  }

  /** Delete a campaign budget. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/campaign-budgets/${id}`)
  }
}
