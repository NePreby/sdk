import { HanzoClient } from '../client'
import type {
  TaxRegion,
  TaxRate,
  TaxRateRule,
  TaxProvider,
  TaxCalculation,
  PaginatedResponse,
} from '../types'

/** Admin operations for tax regions. */
export class TaxRegionAdmin {
  constructor(private client: HanzoClient) {}

  /** List tax regions. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<TaxRegion>>('/admin/tax-regions', query)
  }

  /** Get a tax region by ID. */
  get(id: string) {
    return this.client.get<TaxRegion>(`/admin/tax-regions/${id}`)
  }

  /** Create a tax region. */
  create(data: Partial<TaxRegion>) {
    return this.client.post<TaxRegion>('/admin/tax-regions', data)
  }

  /** Update a tax region. */
  update(id: string, data: Partial<TaxRegion>) {
    return this.client.put<TaxRegion>(`/admin/tax-regions/${id}`, data)
  }

  /** Delete a tax region. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/tax-regions/${id}`)
  }
}

/** Admin operations for tax rates. */
export class TaxRateAdmin {
  constructor(private client: HanzoClient) {}

  /** List tax rates. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<TaxRate>>('/admin/tax-rates', query)
  }

  /** Get a tax rate by ID. */
  get(id: string) {
    return this.client.get<TaxRate>(`/admin/tax-rates/${id}`)
  }

  /** Create a tax rate. */
  create(data: Partial<TaxRate>) {
    return this.client.post<TaxRate>('/admin/tax-rates', data)
  }

  /** Update a tax rate. */
  update(id: string, data: Partial<TaxRate>) {
    return this.client.put<TaxRate>(`/admin/tax-rates/${id}`, data)
  }

  /** Delete a tax rate. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/tax-rates/${id}`)
  }
}

/** Admin operations for tax rate rules. */
export class TaxRateRuleAdmin {
  constructor(private client: HanzoClient) {}

  /** List tax rate rules. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<TaxRateRule>>('/admin/tax-rate-rules', query)
  }

  /** Get a tax rate rule by ID. */
  get(id: string) {
    return this.client.get<TaxRateRule>(`/admin/tax-rate-rules/${id}`)
  }

  /** Create a tax rate rule. */
  create(data: Partial<TaxRateRule>) {
    return this.client.post<TaxRateRule>('/admin/tax-rate-rules', data)
  }

  /** Delete a tax rate rule. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/tax-rate-rules/${id}`)
  }
}

/** Admin operations for tax providers. */
export class TaxProviderAdmin {
  constructor(private client: HanzoClient) {}

  /** List tax providers. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<TaxProvider>>('/admin/tax-providers', query)
  }

  /** Get a tax provider by ID. */
  get(id: string) {
    return this.client.get<TaxProvider>(`/admin/tax-providers/${id}`)
  }
}

/** Calculate tax for given line items and context. */
export function calculate(
  client: HanzoClient,
  data: {
    items: Array<{ amount: number; quantity: number; productId?: string }>
    shippingAddress: { countryCode: string; provinceCode?: string; postalCode?: string }
    currencyCode: string
  },
) {
  return client.post<TaxCalculation>('/admin/tax/calculate', data)
}
