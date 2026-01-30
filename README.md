
# CBP Corp - Integrated Legal System

Project ini menggunakan struktur **Monorepo** dengan Turborepo.

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
