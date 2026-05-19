/**
 * @hanzo/sdk - HTTP client for Hanzo Commerce API
 */

export interface HanzoClientConfig {
  baseUrl: string
  apiKey?: string
  publishableKey?: string
  /** Custom fetch implementation (defaults to globalThis.fetch) */
  fetch?: typeof globalThis.fetch
}

export class HanzoClient {
  private baseUrl: string
  private headers: Record<string, string>
  private fetchFn: typeof globalThis.fetch

  constructor(config: HanzoClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.fetchFn = config.fetch ?? globalThis.fetch.bind(globalThis)

    this.headers = { 'Content-Type': 'application/json' }
    if (config.apiKey) {
      this.headers['Authorization'] = `Bearer ${config.apiKey}`
    }
    if (config.publishableKey) {
      this.headers['x-publishable-api-key'] = config.publishableKey
    }
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    query?: Record<string, string>,
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`

    if (query && Object.keys(query).length > 0) {
      const params = new URLSearchParams(query)
      url += `?${params.toString()}`
    }

    const res = await this.fetchFn(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Hanzo API ${method} ${path} failed (${res.status}): ${text}`)
    }

    if (res.status === 204) return undefined as T
    return res.json() as Promise<T>
  }

  get<T>(path: string, query?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', path, undefined, query)
  }

  post<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>('POST', path, data)
  }

  put<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>('PUT', path, data)
  }

  patch<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, data)
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path)
  }
}
