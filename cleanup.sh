
#!/bin/bash

echo "=== MEMULAI PEMBERSIHAN FILE LEGACY ==="

# --- COMPRO CLEANUP ---
echo "Membersihkan apps/compro..."
rm -f apps/compro/index.html
rm -f apps/compro/vite.config.ts
rm -f apps/compro/src/main.tsx
rm -f apps/compro/src/App.tsx
rm -rf apps/compro/src/pages

# --- SYSLEGAL CLEANUP ---
echo "Membersihkan apps/syslegal..."

# 1. Hapus Config & Entry Point Legacy
rm -f apps/syslegal/index.html
rm -f apps/syslegal/vite.config.ts
rm -f apps/syslegal/src/main.tsx
rm -f apps/syslegal/src/App.tsx

# 2. Hapus Folder Pages Lama (Wajib dihapus karena Next.js scan folder ini)
if [ -d "apps/syslegal/src/pages" ]; then 
    echo "Menghapus folder legacy: apps/syslegal/src/pages"
    rm -rf apps/syslegal/src/pages
fi

# 3. Hapus Komponen Legacy yang menyebabkan Error Build
# ProtectedRoute lama pakai react-router-dom, ini harus dihapus.
rm -f apps/syslegal/src/components/ProtectedRoute.tsx

# --- ROOT CLEANUP ---
rm -f index.html

echo "=== PEMBERSIHAN SELESAI ==="
echo "Struktur project sekarang bersih (Next.js Pure)."
echo "Silakan jalankan: npm run dev"
