# Setup & Local Development — CBP Corp

> Prerequisites: Node 18.18+ (npm 10), Git. Windows/macOS/Linux supported.

## 1. Clone & install

```bash
git clone https://github.com/aminmaghfuriprive/CBP.git
cd CBP
npm install            # installs all workspaces (apps + packages)
```

## 2. Environment variables

Copy the example and fill in secrets:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes (AI features) | Google Gemini API key — **server-side only**, never expose to client |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical app URL (SEO/metadata), e.g. `https://cbpcorp.id` |
| `NEXT_PUBLIC_SYSLEGAL_URL` | No | Syslegal base URL for cross-app links (default `http://localhost:3001`) |

> `.env.local` is gitignored. Never commit real secrets. See `SECURITY.md`.

## 3. Run development

```bash
npm run dev           # turbo: weblegal (:3000) + syslegal (:3001) together
```

Open:
- Weblegal → http://localhost:3000
- Syslegal → http://localhost:3001

To run a single app:
```bash
npm run dev --filter=cbp-weblegal
npm run dev --filter=cbp-syslegal
```

## 4. Build & start (production-like)

```bash
npm run build
npm run dev   # or start individually:
# cd apps/weblegal && npm run start   (port 3000)
# cd apps/syslegal && npm run start   (port 3001)
```

Low-memory environments may need:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## 5. Lint & format

```bash
npm run lint           # turbo: lint all workspaces
npm run format         # prettier --write across repo
```

## 6. Cleanup (post-migration)

If you still see legacy `app/`, `website/`, or `components/` at repo root:
```bash
sh cleanup.sh
```

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `next build` OOM / `memory allocation failed` | Low RAM | Set `NODE_OPTIONS=--max-old-space-size=4096` |
| `TypeError: Invalid URL` during `/icon` prerender (Windows) | `@vercel/og` `ImageResponse` crash | Use static `icon.svg` (already fixed) |
| Port 3000/3001 already in use | Stale dev server | Kill the process or use `next dev -p <other>` |
| AI features 500 | Missing `GEMINI_API_KEY` | Add key to `.env.local` |
