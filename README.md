# @hanzo/sdk

Unified Hanzo TypeScript SDK. One install, every service.

```bash
npm install @hanzo/sdk
```

## Quick start

```ts
import { HanzoSDK } from '@hanzo/sdk'

const hanzo = new HanzoSDK({
  baseUrl: 'https://api.hanzo.ai',
  token: process.env.HANZO_API_KEY,
})

// IAM
await hanzo.iam.applications.redirectURIs.add('vcc-exchange-client-id', [
  'http://vcc.localhost:3000/auth/callback',
  'http://vcc.localhost:3000/callback',
])

// KMS
const secret = await hanzo.kms.secrets.get('hanzo/prod/api-key')

// Commerce
const cart = await hanzo.commerce.store.carts.create({ regionId: 'reg_us' })
```

## Services covered

Each service lines up 1:1 with its upstream Go service under
[`github.com/hanzoai`](https://github.com/hanzoai). The TypeScript
client is the thin layer; the upstream Go service owns the canonical
behavior and is where docs live for the underlying REST surface.

| Subpath               | Upstream Go service                                          | What it does                                                                                       |
|-----------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `@hanzo/sdk/iam`      | [`hanzoai/iam`](https://github.com/hanzoai/iam)              | OIDC + OAuth2, applications (OIDC clients), redirect URIs, users, organizations, JWT mint / verify |
| `@hanzo/sdk/kms`      | [`hanzoai/kms`](https://github.com/hanzoai/kms)              | Secrets (get / set / list / delete), envelope encrypt / decrypt, KMSSecret reconciler              |
| `@hanzo/sdk/commerce` | [`hanzoai/commerce`](https://github.com/hanzoai/commerce)    | Storefront + admin (products, carts, orders, customers)                                            |
| `@hanzo/sdk/billing`  | [`hanzoai/billing`](https://github.com/hanzoai/billing)      | Subscriptions, invoices, usage metering, webhook verification                                      |
| `@hanzo/sdk/mpc`      | [`hanzoai/mpc`](https://github.com/hanzoai/mpc)              | Threshold signatures (CGGMP21 secp256k1 + FROST Ed25519)                                           |
| `@hanzo/sdk/paas`     | [`hanzoai/paas`](https://github.com/hanzoai/paas)            | Deployments, environments, rolling rollout, log streams                                            |
| `@hanzo/sdk/team`     | [`hanzoai/team`](https://github.com/hanzoai/team)            | Team membership, roles, invites                                                                    |
| `@hanzo/sdk/api`      | [`hanzoai/api`](https://github.com/hanzoai/api)              | Unified gateway — generic REST passthrough for services not yet wrapped                            |

Tree-shakable subpath imports — `import { IAMClient } from '@hanzo/sdk/iam'`
ships only the IAM client to the consumer's bundle.

## Most common: add an OIDC redirect URI

```ts
import { IAMClient } from '@hanzo/sdk/iam'

const iam = new IAMClient({
  baseUrl: 'https://iam.hanzo.ai',
  token: process.env.IAM_SERVICE_TOKEN, // bearer from any liquid-iam pod env
})

await iam.applications.redirectURIs.add('vcc-exchange-client-id', [
  'http://vcc.localhost:3000/auth/callback',
  'http://vcc.localhost:3000/callback',
])
```

Same operation via the CLI (no code, no clone, identical behavior):

```bash
liquid iam redirect add vcc-exchange-client-id \
  http://vcc.localhost:3000/auth/callback \
  http://vcc.localhost:3000/callback
```

(See [`liquidityio/cli`](https://github.com/liquidityio/cli) for the
env-aware `liquid` wrapper that knows
`iam.hanzo.ai` hosts.)

## Environment + multi-tenant config

Different Hanzo platforms run different hostnames per service (Liquidity
splits `iam.hanzo.ai` and `kms.hanzo.ai`; the public
Hanzo cloud is all one origin). The SDK lets you override per service:

```ts
const liquidityDev = new HanzoSDK({
  token: process.env.IAM_SERVICE_TOKEN,
  services: {
    iam: 'https://iam.hanzo.ai',
    kms: 'https://kms.hanzo.ai',
    api: 'https://api.hanzo.ai',
  },
})

// Or one-shot construct a single service client:
const kms = new KMSClient({ baseUrl: 'https://kms.hanzo.ai', token })
```

## Error handling

Every non-2xx response throws `HanzoAPIError` with status + body:

```ts
import { HanzoAPIError } from '@hanzo/sdk'

try {
  await iam.applications.get({ clientId: 'nope' })
} catch (err) {
  if (err instanceof HanzoAPIError && err.status === 404) {
    // expected
  } else {
    throw err
  }
}
```

## Versioning

`@hanzo/sdk` is semver. v2.0.0 is the umbrella restructure (each
service is a subpath); v1.x was Commerce-only. Migration: change
`HanzoSDK` imports to use `hanzo.commerce.admin.*` / `hanzo.commerce.store.*`
instead of `hanzo.admin.*` / `hanzo.store.*`.

## Contributing

Adding a new service:

1. `mkdir src/<service>` and create `index.ts` exporting the client class.
2. Extend `BaseClient` from `src/_shared/client.ts` for HTTP plumbing.
3. Add a `tsup` entry in `tsup.config.ts`.
4. Add a subpath export in `package.json`.
5. Mount the new client on `HanzoSDK` in `src/index.ts`.
6. Document in the table above + write a `src/<service>/README.md`
   linking the upstream Go repo.

One way to do everything: composable, orthogonal, complete.

## License

BSD-3-Clause — see [LICENSE](LICENSE).
