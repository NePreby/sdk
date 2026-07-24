# LLM.md — hanzo-js/sdk

Guidance for AI agents working in this repo.

## What this is
`@hanzo/sdk` — the **full Hanzo Cloud SDK for TypeScript/JavaScript**. One typed
client (`HanzoSDK`) over every `/v1` service: IAM, KMS, Commerce, Billing, MPC,
PaaS, Team, plus a generic gateway (`api`).

## Canonical role
This is the **real-code** home for the TypeScript cloud SDK in the one-way model:
`hanzo-<lang>/sdk` = idiomatic full cloud SDK; `hanzoai/<lang>-sdk` = wrapper/docs
that link here; `hanzoai/sdk` = umbrella. The AI/agents library is separate
(`@hanzo/ai` → `hanzo-js/ai`; Python flagship `hanzo` → `hanzoai/python-sdk`).
DRY: implement once here; discovery repos link out, never duplicate.

## Install / run
- `npm i @hanzo/sdk`
- `npm run build` (tsup) · `npm run dev` (watch) · `npm run typecheck`

## Key entry points
- `src/index.ts` — `HanzoSDK` mounts every service; barrel exports + `HanzoAPIError`.
- `src/_shared/client.ts` — `BaseClient` HTTP plumbing (bearer, JSON, errors). Reuse it.
- `src/<service>/index.ts` — one typed client per service; each maps to `hanzoai/<service>`.

## Brand rules (hard)
- Hanzo is a **full AI SDK / AI cloud**, never an "LLM gateway" and never positioned
  vs LiteLLM. Purge that framing on sight.
- Paths are `/v1/…` only — never an `/api/` prefix.
- Zen models are our own family — never name upstream models.
- Voice: "Hanzo — the Open AI Cloud." Modern, crisp, developer-first.
- Never reference any white-label tenant or upstream fork here.

## Source of truth
Architecture + placement rules: `~/work/hanzo/SDK-ARCHITECTURE.md`.
