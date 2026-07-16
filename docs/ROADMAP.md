# Roadmap — CBP Corp Integrated Legal System

> Vision: a production-grade legal-business platform with real auth, persistent data,
> AI-assisted operations, and enterprise-grade quality gates. Status: **MVP / prototype**
> (mock data, mock auth). Last updated: 2026-07-16.

## Maturity model

```
Phase 0  Stabilize      ✅ done   (build, lint, security baseline, docs)
Phase 1  Secure                  (real auth + server route guards)
Phase 2  Persist                 (backend/DB, replace mocks)
Phase 3  Productionize           (CI/CD, tests, observability, deploy)
Phase 4  Scale & AI              (multi-tenant, advanced AI ops)
```

## Phase 0 — Stabilize ✅ (completed 2026-07-16)
- [x] Fix `/icon` OG prerender crash (static `icon.svg`)
- [x] Root `.gitignore` (secret-leak prevention)
- [x] Harden `next.config.mjs` SVG (CSP + `contentDispositionType`)
- [x] Remove client-side API-key fallback (`ai-client.ts`)
- [x] Fix `@cbp/core` lint config
- [x] Enterprise documentation set (this file + ARCHITECTURE, SETUP, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT)

## Phase 1 — Secure (next)
- [ ] Real authentication (NextAuth credentials / custom, password hashing, secure session cookie)
- [ ] `middleware.ts` server guard on `weblegal` `/portal/*` and `syslegal` `/app/*`
- [ ] Role-based access control using `mock_roles.ts` → real role service
- [ ] Gate `/api/ai` proxy (auth + rate limit + per-user quota)
- [ ] Centralized error/logging; remove silent mock fallbacks

## Phase 2 — Persist
- [ ] Choose backend: Postgres + Prisma **or** Supabase
- [ ] Replace `mock_*.ts` with service layer + API routes
- [ ] Migrate `dexie` local cache to sync-with-server model
- [ ] File/document storage (cases, certificates, templates)
- [ ] Seed & migration scripts

## Phase 3 — Productionize
- [ ] GitHub Actions: lint → build → test → deploy (Vercel)
- [ ] Unit tests (Vitest) + E2E (Playwright) with coverage gate
- [ ] Observability: error tracking (Sentry), API metrics, uptime
- [ ] Env management per stage (dev/staging/prod), secret rotation
- [ ] Accessibility (WCAG 2.1 AA) audit

## Phase 4 — Scale & AI
- [ ] Multi-tenant / client isolation
- [ ] AI agent ops: case triage, document drafting, regulatory watch (Gemini)
- [ ] Omnichannel (social/AYRSHARE) automation hardening
- [ ] Analytics & internal dashboards (recharts → real data)

## Definition of Done (per feature)
1. Code reviewed + merged via PR (template enforced)
2. Lint + build green in CI
3. Tests added/updated (unit ≥ 80% on touched logic)
4. Docs updated (ARCHITECTURE / SETUP / this roadmap)
5. No new `mock_*` added without an issue tracking the real impl
