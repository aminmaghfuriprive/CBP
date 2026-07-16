# Architecture — CBP Corp Integrated Legal System

> Living document. Last updated: 2026-07-16. Owners: Platform Team.

## 1. Overview

CBP Corp is a **Turborepo monorepo** delivering two Next.js 14 (App Router) applications
backed by two shared packages. The system supports a public legal-services company profile
(`weblegal`) and an internal + client-facing legal business-management suite (`syslegal`).

| App | Package name | Port | Audience | Purpose |
|---|---|---|---|---|
| `apps/weblegal` | `cbp-weblegal` | 3000 | Public / Clients | Company profile, insights, legal library, client portal |
| `apps/syslegal` | `cbp-syslegal` | 3001 | Internal staff | Case, client, finance, HR, CMS, AI assistant operations |

| Package | Purpose |
|---|---|
| `packages/ui` | Shared presentational components (Button, Card, layout primitives) |
| `packages/core` | Business logic, types, contexts, data hooks, Gemini AI client, IndexedDB (`dexie`) |

## 2. Dependency Topology

```
apps/weblegal ─┐
               ├─> @cbp/ui ─> @cbp/core
apps/syslegal ─┘            (ui depends on core; apps depend on both)
```

- `apps/*` import `@cbp/ui` and `@cbp/core` via workspace (`"*"`).
- `packages/core` is **framework-agnostic logic** but currently imports `react` for contexts/hooks.
  It must NOT import `next` or any app-specific module (keep the boundary clean).
- `packages/ui` imports `react` + `lucide-react` + `@cbp/core` only.

**Rule:** `core` and `ui` are leaves. Apps never import each other. Cross-app integration uses
HTTP (`NEXT_PUBLIC_SYSLEGAL_URL`) or shared backend, never direct module imports.

## 3. Runtime Architecture

### 3.1 Request flow (App Router)
```
Browser → Next.js App Router → (Server Component | Route Handler | Client Component)
                                     │
              ┌──────────────────────┼───────────────────────┐
              ▼                      ▼                       ▼
        React Server Components   Route Handlers        Client Components
        (data fetch, SEO)         (/api/*, AI proxy)    (Context providers,
                                                                            hooks)
```

### 3.2 State & data
- **Client state:** React Context (`AuthContext`, `DataContext`, `NotificationContext`,
  `ThemeContext`) defined in `packages/core/src/context/*`.
- **Local persistence:** `dexie` (IndexedDB) in `packages/core/src/db` (offline cache / queue).
- **Remote data:** currently **mock** modules in `packages/core/src/data/mock_*.ts`.
  No production backend is wired yet — all lists are in-memory fixtures.
- **AI:** `packages/core/src/lib/ai-client.ts` → `services/geminiService.ts` → Google Gemini
  (`@google/genai`). Server-side key only (`GEMINI_API_KEY`).

### 3.3 AI proxy
`apps/*/app/api/ai/route.ts` forwards prompts to Gemini. **Currently an open proxy** (no auth).
Must be gated before production (see Security).

## 4. Routing Map

### weblegal (`:3000`)
- Public: `/`, `/about`, `/services`, `/insights`, `/insights/[id]`, `/legal`, `/legal/[slug]`,
  `/library`, `/library/[id]`, `/book`, `/careers`, `/contact`, `/portfolio`, `/sitemap`
- Auth: `/auth/login`, `/auth/register`
- **Client portal (UI-gated, no server guard yet):** `/portal/*`
  (`dashboard`, `cases`, `cases/[id]`, `billing`, `new-request`)

### syslegal (`:3001`)
- Auth: `/login`
- App shell: `/app/*` (`layout.tsx`) — `agenda`, `assistant`, `bookings`, `cases`, `clients`,
  `cms`, `documents`, `employees`, `finance`, `my-cases`, `my-invoices`, `omnichannel`,
  `regulations`, `schedule`, `services` (+ `create`, `[id]`), `settings`, `social`,
  `verification`
- API: `/api/ai`

## 5. Key Modules (`packages/core`)

| Path | Responsibility |
|---|---|
| `src/context/*` | Global React state providers |
| `src/data/mock_*.ts` | Fixture datasets (cases, clients, finance, roles, users, …) |
| `src/hooks/use*Logic.ts` | Business logic per domain (case, booking, payroll, …) |
| `src/lib/ai-client.ts` | Gemini client bootstrap (server key only) |
| `src/services/geminiService.ts` | Prompt orchestration |
| `src/db/index.ts` | Dexie schema |
| `src/types/*` | Domain models (auth, business, finance, operations, regulation, system) |
| `src/utils/*` | Formatters, mappers |

## 6. Build & Tooling

- **Monorepo:** Turborepo (`turbo.json`). Pipeline: `build`, `dev`, `lint`.
- **Bundler:** Next.js 14.1.0 (App Router, RSC).
- **Styling:** Tailwind CSS 3.4 + `@tailwindcss/typography`.
- **Lint:** `eslint-config-next` (per app) + `next/core-web-vitals` for `core`
  (`.eslintrc.json`).
- **Format:** Prettier 3 (`npm run format`).
- **Node:** `packageManager: npm@10.0.0`. Low-RAM CI may need
  `NODE_OPTIONS=--max-old-space-size=4096`.

## 7. Known Architectural Gaps (tracked)

| # | Gap | Impact | Target |
|---|---|---|---|
| A1 | Auth is 100% mock (`MOCK_USERS_DB`, localStorage) — no server verification | Security | Real auth (NextAuth / credentials → API, hashed pw, secure session) |
| A2 | `weblegal` has no `middleware.ts` — `/portal/*` gated only in UI | Security | Server-side route guard + session cookie |
| A3 | All data is mock — no backend/DB integration | Functionality | API layer + DB (Postgres/Prisma or supabase) |
| A4 | `/api/ai` is an open proxy | Cost/Abuse | Auth + rate limit + quota |
| A5 | `next.config.mjs` `dangerouslyAllowSVG: true` — hardened with CSP, but still open | Security | Validate SVG source / sandbox strictly |
| A6 | No tests (unit/E2E) | Quality | Vitest + Playwright |
| A7 | No CI/CD | Delivery | GitHub Actions (lint, build, test, deploy) |

See `docs/ROADMAP.md` for the sequenced plan.
