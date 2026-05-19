/**
 * Common HTTP plumbing reused by every service client. One implementation,
 * one place to add retries / instrumentation / auth refresh later.
 */

export interface ServiceConfig {
  /** Service base URL (no trailing slash). */
  baseUrl: string
  /** Bearer token sent on every request. */
  token?: string
  /** Custom fetch (e.g. node-fetch, undici, instrumented). */
  fetch?: typeof globalThis.fetch
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined>
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

export class HanzoAPIError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: unknown,
    message?: string,
  ) {
    super(message ?? `Hanzo API ${status} ${statusText}`)
    this.name = 'HanzoAPIError'
  }
}

export class BaseClient {
  constructor(protected readonly cfg: ServiceConfig) {
    if (!cfg.baseUrl) {
      throw new Error('BaseClient: baseUrl is required')
    }
  }

  protected async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    opts: RequestOptions = {},
  ): Promise<T> {
    const url = new URL(path, this.cfg.baseUrl)
    if (opts.query) {
      for (const [k, v] of Object.entries(opts.query)) {
        if (v !== undefined) url.searchParams.set(k, String(v))
      }
    }
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...opts.headers,
    }
    if (this.cfg.token) headers.Authorization = `Bearer ${this.cfg.token}`
    if (opts.body !== undefined) headers['Content-Type'] = 'application/json'

    const f = this.cfg.fetch ?? globalThis.fetch
    const resp = await f(url.toString(), {
      method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
    })

    const text = await resp.text()
    let parsed: unknown = text
    if (text && resp.headers.get('content-type')?.includes('application/json')) {
      try {
        parsed = JSON.parse(text)
      } catch {
        // leave as text
      }
    }

    if (!resp.ok) {
      throw new HanzoAPIError(resp.status, resp.statusText, parsed)
    }
    return parsed as T
  }

  protected get<T>(path: string, opts?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, opts)
  }
  protected post<T>(path: string, opts?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, opts)
  }
  protected put<T>(path: string, opts?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, opts)
  }
  protected patch<T>(path: string, opts?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, opts)
  }
  protected delete<T>(path: string, opts?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, opts)
  }
}
