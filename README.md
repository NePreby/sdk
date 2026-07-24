# @hanzo/sdk

**The Hanzo Cloud SDK for TypeScript.** One typed client for every `/v1`
service — IAM, KMS, Commerce, Billing, MPC, PaaS, Team. One install,
every service, fully tree-shakable.

[![npm](https://img.shields.io/npm/v/@hanzo/sdk?color=000&label=%40hanzo%2Fsdk)](https://www.npmjs.com/package/@hanzo/sdk)
[![license](https://img.shields.io/badge/license-BSD--3--Clause-000)](./LICENSE)

```bash
npm i @hanzo/sdk
```

## Quick start

```ts
import { HanzoSDK } from '@hanzo/sdk'

const hanzo = new HanzoSDK({
  baseUrl: 'https://api.hanzo.ai', // default
  token: process.env.HANZO_API_KEY,
})

// Read a secret from KMS
const secret = await hanzo.kms.secrets.get('hanzo/prod/webhook-secret')

// Create a storefront cart
const cart = await hanzo.commerce.store.carts.create({ regionId: 'reg_us' })
```

Every request rides `https://api.hanzo.ai/v1/*` with a bearer token. Non-2xx
responses throw `HanzoAPIError` carrying the status and parsed body.

## Services

Each service is a typed, tree-shakable client. The canonical `/v1` behavior —
and the authoritative REST reference — lives with each service's own repo under
[`github.com/hanzoai`](https://github.com/hanzoai); the TypeScript client is the
idiomatic layer over it.

| Subpath               | Service repo                                               | What it does                                                                                       |
|-----------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `@hanzo/sdk/iam`      | [`hanzoai/iam`](https://github.com/hanzoai/iam)           | OIDC + OAuth2, applications (OIDC clients), redirect URIs, users, organizations, JWT mint / verify |
| `@hanzo/sdk/kms`      | [`hanzoai/kms`](https://github.com/hanzoai/kms)           | Secrets (get / set / list / delete), envelope encrypt / decrypt, KMSSecret reconciler              |
| `@hanzo/sdk/commerce` | [`hanzoai/commerce`](https://github.com/hanzoai/commerce) | Storefront + admin (products, carts, orders, customers)                                            |
| `@hanzo/sdk/billing`  | [`hanzoai/billing`](https://github.com/hanzoai/billing)   | Subscriptions, invoices, usage metering, webhook verification                                      |
| `@hanzo/sdk/mpc`      | [`hanzoai/mpc`](https://github.com/hanzoai/mpc)           | Threshold signatures (CGGMP21 secp256k1 + FROST Ed25519)                                           |
| `@hanzo/sdk/paas`     | [`hanzoai/paas`](https://github.com/hanzoai/paas)         | Deployments, environments, rolling rollout, log streams                                            |
| `@hanzo/sdk/team`     | [`hanzoai/team`](https://github.com/hanzoai/team)         | Team membership, roles, invites                                                                    |
| `@hanzo/sdk/api`      | [`hanzoai/api`](https://github.com/hanzoai/api)           | Unified gateway — typed passthrough for `/v1` services not yet wrapped                             |

Subpath imports are tree-shakable — `import { IAMClient } from '@hanzo/sdk/iam'`
ships only the IAM client to the consumer's bundle.

## Example: add an OIDC redirect URI

```ts
import { IAMClient } from '@hanzo/sdk/iam'

const iam = new IAMClient({
  baseUrl: 'https://iam.hanzo.ai',
  token: process.env.HANZO_API_KEY,
})

await iam.applications.redirectURIs.add('myapp-web', [
  'http://localhost:3000/auth/callback',
  'https://myapp.hanzo.app/auth/callback',
])
```

For browser SPA login (OIDC PKCE) reach for `@hanzo/iam` instead — it ships
browser-friendly auth helpers. This SDK is the server-side / CLI admin client.

## Per-service host overrides

Every service defaults to `baseUrl` (`https://api.hanzo.ai`). Point individual
services at their own origin when you need to:

```ts
const hanzo = new HanzoSDK({
  token: process.env.HANZO_API_KEY,
  services: {
    iam: 'https://iam.hanzo.ai',
    kms: 'https://kms.hanzo.ai',
  },
})

// Or construct a single service client directly:
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

`@hanzo/sdk` is semver. v2.0.0 is the umbrella restructure — each service is a
subpath. v1.x was Commerce-only; migrate `hanzo.admin.*` / `hanzo.store.*` to
`hanzo.commerce.admin.*` / `hanzo.commerce.store.*`.

## Contributing

Adding a new service:

1. `mkdir src/<service>` and create `index.ts` exporting the client class.
2. Extend `BaseClient` from `src/_shared/client.ts` for HTTP plumbing.
3. Add a `tsup` entry in `tsup.config.ts`.
4. Add a subpath export in `package.json`.
5. Mount the new client on `HanzoSDK` in `src/index.ts`.
6. Document in the table above + write a `src/<service>/README.md`
   linking the canonical service repo.

One way to do everything: composable, orthogonal, complete.

## License

BSD-3-Clause — see [LICENSE](LICENSE).

## Hanzo — the Open AI Cloud

Open source · every language · on-chain settlement. [hanzo.ai](https://hanzo.ai) · [docs.hanzo.ai](https://docs.hanzo.ai)

**SDKs in every language** — [Python](https://github.com/hanzoai/python-sdk) (flagship) · [TypeScript](https://github.com/hanzo-js/sdk) · [Go](https://github.com/hanzo-go/sdk) · [Rust](https://github.com/hanzo-rs/sdk) · [C++](https://github.com/hanzo-cpp/sdk) · [Swift](https://github.com/hanzo-swift/sdk) · [Kotlin](https://github.com/hanzo-kt/sdk) · [umbrella](https://github.com/hanzoai/sdk)
