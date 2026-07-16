
# CBP Corp — Integrated Legal System

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stack: Next.js 14](https://img.shields.io/badge/stack-Next.js%2014-black)](https://nextjs.org)
[![Monorepo: Turborepo](https://img.shields.io/badge/monorepo-Turborepo-EF4444)](https://turbo.build)

**CBP Corp** adalah sistem hukum terintegrasi berbasis **Turborepo monorepo**:
satu website profil perusahaan publik (`weblegal`) dan satu suite manajemen bisnis
legal internal + klien (`syslegal`), dibangun di atas Next.js 14 (App Router) dengan
dua paket bersama (`ui`, `core`).

> 📌 Status: **MVP / prototype** — data & auth masih mock. Lihat `docs/ROADMAP.md`.

## Documentation
| Doc | Isi |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Topologi, modul, routing, gaps |
| [`docs/SETUP.md`](docs/SETUP.md) | Install, env, dev, build, troubleshooting |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Fase pengembangan & Definition of Done |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Workflow & standar kontribusi |
| [`SECURITY.md`](SECURITY.md) | Kebijakan keamanan & known gaps |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Contributor Covenant |

## Struktur Project

### Apps
* **`apps/weblegal`** — Company Profile (Public) · Port **3000** · `cbp-weblegal`
* **`apps/syslegal`** — Legal Business Management (Internal & Client) · Port **3001** · `cbp-syslegal`

### Packages
* **`packages/ui`** — Komponen UI bersama (Button, Card, dll)
* **`packages/core`** — Logika bisnis, tipe, konstanta, context, AI client, IndexedDB

## Quick Start
```bash
npm install
cp .env.example .env.local   # isi GEMINI_API_KEY
npm run dev                  # weblegal :3000 + syslegal :3001
```
Detail: [`docs/SETUP.md`](docs/SETUP.md).

## Scripts
| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan semua app (turbo) |
| `npm run build` | Build production semua app |
| `npm run lint` | Lint semua workspace |
| `npm run format` | Prettier write across repo |

## Catatan Migrasi
Jika masih ada folder `app/`, `website/`, atau `components/` di root:
```bash
sh cleanup.sh
```

## License
MIT — lihat [`LICENSE`](LICENSE).


## Struktur Project

### Apps
* **`apps/weblegal`**: Website Company Profile (Public Facing) - Port 3000. Dikenal juga sebagai `cbp-weblegal`.
* **`apps/syslegal`**: Sistem Manajemen Unit Bisnis Legal (Internal & Client Portal) - Port 3001. Dikenal juga sebagai `cbp-syslegal`.

### Packages
* **`packages/ui`**: Komponen UI (Button, Card, dll) yang digunakan bersama.
* **`packages/core`**: Logika bisnis, Tipe data (Types), Konstanta, dan Context.

## Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Mode Development**
   ```bash
   npm run dev
   ```
   Perintah ini akan menjalankan Website (Weblegal) dan SysLegal secara bersamaan.

3. **Build Production**
   ```bash
   npm run build
   ```

## Catatan Migrasi
Jika Anda masih melihat folder `app/`, `website/`, atau `components/` di root directory, silakan jalankan skrip pembersihan:
```bash
sh cleanup.sh
```
