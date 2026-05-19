/**
 * @hanzo/sdk/iam — typed client for Hanzo IAM.
 *
 * Upstream Go service: https://github.com/hanzoai/iam
 * REST API surface: https://github.com/hanzoai/iam/blob/main/routers/router.go
 *
 * Covers the admin operations every consumer reaches for:
 *
 *   applications:        list / fetch / upsert / remove  (OIDC clients)
 *   redirect URIs:       add / list / remove             (the Slack-thread case)
 *   users:               list / fetch / create
 *   organizations:       list / create / remove
 *
 * For SPA login (OIDC PKCE) use the lower-level `@hanzo/iam` package
 * which ships browser-friendly auth helpers; this SDK is the
 * server-side / CLI admin client.
 */

import { BaseClient, ServiceConfig } from '../_shared/client'

export interface IAMConfig extends ServiceConfig {}

export interface Application {
  organization: string
  name: string
  clientId: string
  clientSecret?: string
  displayName?: string
  grantTypes?: string[]
  redirectUris: string[]
  scopes?: string[]
  signinMethods?: SigninMethod[]
  createdTime?: string
  updatedTime?: string
}

export interface SigninMethod {
  name: string
  displayName: string
  rule: string
}

export interface ApplicationUpsert {
  organization: string
  name: string
  clientId: string
  displayName?: string
  grantTypes?: string[]
  redirectUris?: string[]
  scopes?: string[]
}

export interface User {
  owner: string // organization slug
  name: string
  email?: string
  phone?: string
  displayName?: string
  isAdmin?: boolean
  permissions?: string[]
  createdTime?: string
}

export interface Organization {
  name: string
  displayName?: string
  websiteUrl?: string
  createdTime?: string
}

/**
 * Idiomatic client. Construct once and reach into subresources:
 *
 *   const iam = new IAMClient({ baseUrl: 'https://iam.hanzo.ai', token })
 *   await iam.applications.redirectURIs.add('vcc-exchange-client-id', [
 *     'http://vcc.localhost:3000/auth/callback',
 *     'http://vcc.localhost:3000/callback',
 *   ])
 */
export class IAMClient {
  readonly applications: ApplicationsAPI
  readonly users: UsersAPI
  readonly organizations: OrganizationsAPI

  constructor(cfg: IAMConfig) {
    this.applications = new ApplicationsAPI(cfg)
    this.users = new UsersAPI(cfg)
    this.organizations = new OrganizationsAPI(cfg)
  }
}

class ApplicationsAPI {
  readonly redirectURIs: RedirectURIsAPI
  private readonly http: ApplicationsHTTP

  constructor(cfg: IAMConfig) {
    this.http = new ApplicationsHTTP(cfg)
    this.redirectURIs = new RedirectURIsAPI(this)
  }

  /** List every application. Filter by `owner` (organization slug). */
  list(opts: { owner?: string } = {}): Promise<Application[]> {
    return this.http.list(opts.owner)
  }

  /** Fetch by clientId (preferred) or by full org/name id. */
  fetch(args: { clientId: string } | { id: string }): Promise<Application> {
    return this.http.fetch(args)
  }

  /**
   * Idempotent upsert. Always sends the FULL desired state — fields
   * omitted from `app` are NOT cleared (server merges with existing).
   * For destructive overwrites, fetch first, modify, then upsert.
   */
  upsert(app: ApplicationUpsert): Promise<void> {
    return this.http.upsert(app)
  }

  /** Remove by clientId or org/name. */
  remove(args: { clientId: string } | { name: string; owner: string }): Promise<void> {
    return this.http.remove(args)
  }
}

/**
 * Sub-resource for the most-asked admin operation: managing the OIDC
 * redirect-URI allow-list. Read-modify-write on the parent
 * `redirectUris` array.
 */
class RedirectURIsAPI {
  constructor(private readonly apps: ApplicationsAPI) {}

  /** Return the current allow-list. */
  async list(clientId: string): Promise<string[]> {
    const app = await this.apps.fetch({ clientId })
    return app.redirectUris ?? []
  }

  /**
   * Add one or more URIs. Idempotent — re-adding a URI already in the
   * list is a no-op. Returns the count actually added.
   */
  async add(clientId: string, urls: string | string[]): Promise<number> {
    const list = Array.isArray(urls) ? urls : [urls]
    const app = await this.apps.fetch({ clientId })
    const current = app.redirectUris ?? []
    const merged = Array.from(new Set([...current, ...list]))
    if (merged.length === current.length) return 0
    await this.apps.upsert({
      organization: app.organization,
      name: app.name,
      clientId: app.clientId,
      redirectUris: merged,
    })
    return merged.length - current.length
  }

  /** Remove a URI. No-op if not present. Returns true when removed. */
  async remove(clientId: string, url: string): Promise<boolean> {
    const app = await this.apps.fetch({ clientId })
    const current = app.redirectUris ?? []
    const next = current.filter((u) => u !== url)
    if (next.length === current.length) return false
    await this.apps.upsert({
      organization: app.organization,
      name: app.name,
      clientId: app.clientId,
      redirectUris: next,
    })
    return true
  }
}

// ── Internal HTTP layers (separate so BaseClient method names don't ──
// ── collide with the public surface above) ───────────────────────────

class ApplicationsHTTP extends BaseClient {
  async list(owner?: string): Promise<Application[]> {
    const resp = await this.get<Application[] | { data: Application[] }>(
      '/v1/iam/get-applications',
      { query: owner ? { owner } : {} },
    )
    return normaliseList<Application>(resp)
  }

  async fetch(args: { clientId: string } | { id: string }): Promise<Application> {
    const query: Record<string, string> = {}
    if ('clientId' in args) query.clientId = args.clientId
    if ('id' in args) query.id = args.id
    const resp = await this.get<Application | { data: Application }>(
      '/v1/iam/get-application',
      { query },
    )
    return normaliseOne<Application>(resp)
  }

  async upsert(app: ApplicationUpsert): Promise<void> {
    await this.post<unknown>('/v1/iam/admin/applications/upsert', { body: app })
  }

  async remove(args: { clientId: string } | { name: string; owner: string }): Promise<void> {
    await this.post<unknown>('/v1/iam/delete-application', { body: args })
  }
}

class UsersAPI extends BaseClient {
  async list(opts: { owner?: string } = {}): Promise<User[]> {
    const resp = await this.get<User[] | { data: User[] }>('/v1/iam/get-users', {
      query: opts.owner ? { owner: opts.owner } : {},
    })
    return normaliseList<User>(resp)
  }

  async fetch(args: { owner: string; name: string }): Promise<User> {
    const resp = await this.get<User | { data: User }>('/v1/iam/get-user', {
      query: { owner: args.owner, name: args.name },
    })
    return normaliseOne<User>(resp)
  }

  async create(user: Partial<User> & { owner: string; name: string }): Promise<User> {
    return this.post<User>('/v1/iam/add-user', { body: user })
  }
}

class OrganizationsAPI extends BaseClient {
  async list(): Promise<Organization[]> {
    const resp = await this.get<Organization[] | { data: Organization[] }>(
      '/v1/iam/get-organizations',
    )
    return normaliseList<Organization>(resp)
  }

  async create(org: Partial<Organization> & { name: string }): Promise<Organization> {
    return this.post<Organization>('/v1/iam/add-organization', { body: org })
  }

  async remove(name: string): Promise<void> {
    await this.post<unknown>('/v1/iam/delete-organization', { body: { name } })
  }
}

function normaliseList<T>(resp: T[] | { data: T[] }): T[] {
  if (Array.isArray(resp)) return resp
  return (resp as { data: T[] }).data ?? []
}
function normaliseOne<T>(resp: T | { data: T }): T {
  if (
    typeof resp === 'object' &&
    resp !== null &&
    'data' in (resp as Record<string, unknown>)
  ) {
    return (resp as { data: T }).data
  }
  return resp as T
}
