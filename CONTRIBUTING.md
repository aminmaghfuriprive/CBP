# Contributing — CBP Corp

Thanks for contributing. This project follows a trunk-based, PR-driven workflow with
enterprise quality gates.

## 1. Prerequisites
- Node 18.18+, npm 10 (see `docs/SETUP.md`)
- GitHub account with write access (or fork + PR)
- Copilot/session tooling optional

## 2. Workflow

1. **Create an issue** describing the change (bug, feature, refactor).
2. **Branch** from `main`:
   ```bash
   git checkout main && git pull
   git checkout -b feat/<short-slug>   # or fix/, docs/, chore/
   ```
3. **Develop** following the architecture boundaries (see `ARCHITECTURE.md`):
   - `packages/core` and `packages/ui` are leaves — never import `next` or app code.
   - Never add a new `mock_*` without an issue tracking the real backend impl.
4. **Verify locally:**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit** with clear, imperative messages:
   ```
   feat(portal): add server guard to /portal/*
   fix(icon): replace OG ImageResponse with static svg
   ```
   Include the Co-authored-by trailer when using AI assistance.
6. **Push** and **open a PR** against `main`. Fill the PR template.
7. **Review** — at least one maintainer approval required. CI must be green.

## 3. Coding standards
- TypeScript strict; no `any` without justification.
- Prefer server components; mark client components explicitly (`"use client"`).
- Secrets only via env (server-side). Never `NEXT_PUBLIC_*` for secret keys.
- Committed code must not print secrets or expose internal stack traces in production.
- Run `npm run format` (Prettier) before commit.

## 4. Prohibited
- Committing `.env`, real keys, or credentials (see `SECURITY.md`).
- Bypassing `middleware` auth guards (once implemented).
- Adding business logic inside `apps/*/app/api` beyond thin route handlers.
- Disabling ESLint rules to make CI pass.

## 5. Review checklist (reviewer)
- [ ] Build + lint green
- [ ] Architecture boundary respected
- [ ] No new secrets / mocks without tracking issue
- [ ] Docs updated if behavior changed
- [ ] Tests added for logic changes (Phase 3+)
