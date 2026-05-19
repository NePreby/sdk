import { HanzoClient } from '../client'
import type {
  PriceSet,
  Price,
  PriceList,
  PriceRule,
  PricePreference,
  CalculatedPrice,
  PaginatedResponse,
} from '../types'

/** Admin operations for price sets. */
export class PriceSetAdmin {
  constructor(private client: HanzoClient) {}

  /** List price sets. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<PriceSet>>('/admin/price-sets', query)
  }

  /** Get a price set by ID. */
  get(id: string) {
    return this.client.get<PriceSet>(`/admin/price-sets/${id}`)
  }

  /** Create a price set. */
  create(data: Partial<PriceSet>) {
    return this.client.post<PriceSet>('/admin/price-sets', data)
  }

  /** Update a price set. */
  update(id: string, data: Partial<PriceSet>) {
    return this.client.put<PriceSet>(`/admin/price-sets/${id}`, data)
  }

  /** Delete a price set. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/price-sets/${id}`)
  }
}

/** Admin operations for prices. */
export class PriceAdmin {
  constructor(private client: HanzoClient) {}

  /** List prices. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<Price>>('/admin/prices', query)
  }

  /** Get a price by ID. */
  get(id: string) {
    return this.client.get<Price>(`/admin/prices/${id}`)
  }

  /** Create a price. */
  create(data: Partial<Price>) {
    return this.client.post<Price>('/admin/prices', data)
  }

  /** Update a price. */
  update(id: string, data: Partial<Price>) {
    return this.client.put<Price>(`/admin/prices/${id}`, data)
  }

  /** Delete a price. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/prices/${id}`)
  }
}

/** Admin operations for price lists. */
export class PriceListAdmin {
  constructor(private client: HanzoClient) {}

  /** List price lists. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<PriceList>>('/admin/price-lists', query)
  }

  /** Get a price list by ID. */
  get(id: string) {
    return this.client.get<PriceList>(`/admin/price-lists/${id}`)
  }

  /** Create a price list. */
  create(data: Partial<PriceList>) {
    return this.client.post<PriceList>('/admin/price-lists', data)
  }

  /** Update a price list. */
  update(id: string, data: Partial<PriceList>) {
    return this.client.put<PriceList>(`/admin/price-lists/${id}`, data)
  }

  /** Delete a price list. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/price-lists/${id}`)
  }
}

/** Admin operations for price rules. */
export class PriceRuleAdmin {
  constructor(private client: HanzoClient) {}

  /** List price rules. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<PriceRule>>('/admin/price-rules', query)
  }

  /** Get a price rule by ID. */
  get(id: string) {
    return this.client.get<PriceRule>(`/admin/price-rules/${id}`)
  }

  /** Create a price rule. */
  create(data: Partial<PriceRule>) {
    return this.client.post<PriceRule>('/admin/price-rules', data)
  }

  /** Update a price rule. */
  update(id: string, data: Partial<PriceRule>) {
    return this.client.put<PriceRule>(`/admin/price-rules/${id}`, data)
  }

  /** Delete a price rule. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/price-rules/${id}`)
  }
}

/** Admin operations for price preferences. */
export class PricePreferenceAdmin {
  constructor(private client: HanzoClient) {}

  /** List price preferences. */
  list(query?: Record<string, string>) {
    return this.client.get<PaginatedResponse<PricePreference>>('/admin/price-preferences', query)
  }

  /** Get a price preference by ID. */
  get(id: string) {
    return this.client.get<PricePreference>(`/admin/price-preferences/${id}`)
  }

  /** Create a price preference. */
  create(data: Partial<PricePreference>) {
    return this.client.post<PricePreference>('/admin/price-preferences', data)
  }

  /** Update a price preference. */
  update(id: string, data: Partial<PricePreference>) {
    return this.client.put<PricePreference>(`/admin/price-preferences/${id}`, data)
  }

  /** Delete a price preference. */
  delete(id: string) {
    return this.client.delete<void>(`/admin/price-preferences/${id}`)
  }
}

/** Calculate the resolved price for a set of price set IDs and context. */
export function calculatePrice(
  client: HanzoClient,
  data: {
    priceSetIds: string[]
    currencyCode: string
    context?: Record<string, unknown>
  },
) {
  return client.post<CalculatedPrice[]>('/admin/prices/calculate', data)
}
