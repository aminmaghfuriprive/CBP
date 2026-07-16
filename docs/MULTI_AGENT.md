# Multi-Agent Development Plan — CBP

Panduan kerja paralel untuk proyek CBP (Turborepo monorepo: `apps/weblegal`, `apps/syslegal`, `packages/ui`, `packages/core`). Dokumen ini mendefinisikan profil agen, skill yang dipakai, rule of engagement, dan fase pengembangan. Semua agen di bawah pengawasan **orchestrator** (bos).

> Sumber otoritatif todo ada di session DB (tabel `todos` / `todo_deps`). Dokumen ini adalah snapshot yang bisa dibaca agen dari repo. Bila ada beda, session DB yang menang.

## 1. Topology & Boundary (wajib dibaca semua agen)

```
apps/weblegal  ─┐
apps/syslegal  ─┼─> @cbp/ui  ─> @cbp/core
                │     (leaf)     (leaf)
                └────────────┘
```

- `packages/core` dan `packages/ui` adalah **LEAF**: tidak boleh import dari `apps/*`.
- `apps/weblegal` dan `apps/syslegal` **tidak saling import** (terisolasi).
- Tiap app hanya depend ke `@cbp/ui` + `@cbp/core`.
- Pelanggaran boundary → `agent-architecture` reject PR.

## 2. Agent Profiles

| Agent | Domain | Skill utama | Batasan |
|---|---|---|---|
| **agent-frontend** | `apps/weblegal` + `apps/syslegal` (Next.js 14 App Router, Tailwind, client components) | `frontend-web-dev` (React 19/Next), `ui-theme-designer`, `shadcn` | Jangan ubah `packages/*` langsung; lewat PR dari architecture. Konsumsi token dari `packages/ui`, jangan hardcode style duplikat. |
| **agent-backend** | `packages/core` + API routes di tiap app | `backend`, `integrate-webapi` (Dataverse bila perlu), `nextjs` route handlers | Logic reusable masuk `packages/core`, bukan app. Jangan bikin DB baru tanpa koordinasi architecture. |
| **agent-architecture** | `packages/ui` + `packages/core`, `turbo.json`, tsconfig project refs, shared types | `context-engineering:context-architect`, `project-planning:planner`, `refactor-plan` | Jaga boundary leaf; setujui perubahan breaking di types. |
| **agent-qa** | Seluruh repo | `testing-automation` (playwright, tdd), `ai-team-orchestration:ai-team-qa` | Tidak nulis fitur; hanya verifikasi (`turbo build` + lint + E2E) + buat GitHub issue bila gagal. |
| **agent-security** | Secret handling, auth, input validation di trust boundary | `software-engineering-team:se-security-reviewer`, `security-review` | Pastikan proxy API (Gemini) tidak bocor key; secret scanning; authz di syslegal client portal. |

## 3. Skill Mapping

- **frontend** → `frontend-web-dev:playwright-explore-website` + `playwright-generate-test` (verifikasi UI); `ui-theme-designer-design-tokens` (design system di `packages/ui`); `shadcn` (komponen).
- **backend** → Next.js route handlers (`app/app/api/*`); `integrate-webapi` bila butuh Dataverse; `postgresql` bila ada DB. Core logic murni di `packages/core` tanpa dependensi React.
- **architecture** → `context-architect` (audit dependency graph); `project-planning:planner` (rencana refactor); `refactor-plan` saat ubah struktur monorepo.
- **qa** → `testing-automation:playwright-tester` + `tdd-red/tdd-green`; `ai-team-qa` (sign-off). Jalankan `npx turbo build lint test` sebelum approve merge.
- **security** → `se-security-reviewer` (OWASP); `security-review` (audit PR). Fokus: secret scanning, SSRF pada proxy, authz di syslegal.

## 4. Rules of Engagement

1. **rule-boundary** — core/ui LEAF, apps tidak saling import. Lihat topology di atas.
2. **rule-merge-policy** — Semua perubahan via PR ke branch agent masing-masing, di-review orchestrator. QA + Security hijau sebelum merge ke `main`. Tidak ada direct push ke `main`.
3. **rule-todo-central** — Semua agen update tabel `todos` di session DB. Status: `pending` → `in_progress` → `done`. Dependency via `todo_deps`. Orchestrator satu-satunya yang ubah status cross-agent.
4. **rule-branch-per-agent** — Tiap agen di branch terpisah (`agent/frontend-*`, `agent/backend-*`, dst) off `main`. Sync berkala via rebase; batasi scope per package untuk hindari conflict.

## 5. Phases

| Phase | Judul | Scope | Agent utama | Depends on | Status |
|---|---|---|---|---|---|
| **Phase 0** | Stabilize | Turborepo + Next.js 14 stabil, `cleanup.sh` selesai, `.env.example` terisi | — | boundary + branch rules | ✅ done |
| **Phase 1** | Secure | Real auth (NextAuth/custom, password hashing, secure cookie), `middleware.ts` guard di `/portal/*` + `/app/*`, RBAC → real role service, gate `/api/ai` proxy (auth+rate limit+quota), centralized error/logging | backend + security | Phase 0 | pending |
| **Phase 2** | Persist | Backend Postgres+Prisma atau Supabase, ganti `mock_*.ts` → service layer + API routes, migrasi dexie → sync-server, file/document storage, seed & migration | backend + architecture | Phase 1 | pending |
| **Phase 3** | Productionize | GitHub Actions (lint→build→test→deploy Vercel), Vitest + Playwright + coverage gate, observability (Sentry, metrics, uptime), env per stage + secret rotation, a11y WCAG 2.1 AA | qa + architecture + security | Phase 2 | pending |
| **Phase 4** | Scale & AI | Multi-tenant / client isolation, AI ops (case triage, doc drafting, regulatory watch via Gemini), omnichannel (AYRSHARE) hardening, analytics dashboard real data | backend + architecture + frontend | Phase 3 | pending |

Gap terkait (lihat `ARCHITECTURE.md`): A1 mock auth, A2 no middleware, A3 mock data, A4 open AI proxy, A5 SVG, A6 no tests, A7 no CI/CD.

## 6. Cara Kerja Harian

1. Agen ambil todo `pending` yang dependency-nya `done`, set ke `in_progress`.
2. Kerja di branch `agent/<nama>-*`.
3. PR ke branch agen → orchestrator review → QA+Security hijau → orchestrator merge ke `main`.
4. Update `todos` di session DB tiap transisi status.
