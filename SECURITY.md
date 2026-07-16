# Security Policy — CBP Corp

## 1. Supported versions
| Version | Supported |
|---|---|
| `main` (latest) | ✅ |
| older branches | ❌ |

## 2. Reporting a vulnerability
**Do NOT open a public issue for security flaws.**

Email the maintainers or use GitHub **Private Vulnerability Reporting**
(Security → Report a vulnerability). Include:
- Description & impact
- Steps to reproduce
- Affected component (`apps/weblegal`, `apps/syslegal`, `packages/core`, `packages/ui`)

We aim to acknowledge within 72h and provide a remediation plan within 14 days.

## 3. Known security gaps (tracked, not yet fixed)
| ID | Gap | Severity | Plan |
|---|---|---|---|
| S1 | Auth is mock (no real credential verification) | High | Real auth + session (Roadmap Phase 1) |
| S2 | No `middleware.ts` guard on `weblegal` `/portal/*` | High | Server route guard |
| S3 | `/api/ai` open proxy (no auth/rate-limit) | Medium | Gate + quota |
| S4 | `dangerouslyAllowSVG: true` | Low | Hardened w/ CSP; restrict source |

## 4. Secret handling
- **Never** commit `.env`, `.env.local`, or any file containing keys.
- Server secrets use `GEMINI_API_KEY` (server-side only). Client-exposed vars must be
  non-sensitive (`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SYSLEGAL_URL`).
- `ai-client.ts` must read keys **only** from server env, never `NEXT_PUBLIC_*`.
- Rotate keys immediately if exposed; assume exposed once committed to git history.

## 5. Hardening already applied
- Root `.gitignore` blocks `.env*`, `node_modules/`, `.next/`, `.turbo/`.
- `next.config.mjs` images: `contentDispositionType: 'attachment'` +
  `contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"`.
- Client-side API-key fallback removed from `ai-client.ts`.

## 6. Dependencies
- Run `npm audit` regularly. Pin critical deps; avoid unmaintained packages.
- AI/SDK packages (`@google/genai`) reviewed before upgrade.
