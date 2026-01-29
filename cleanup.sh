#!/bin/bash

echo "=== MEMULAI PEMBERSIHAN FILE LEGACY ==="

# 1. Bersihkan file root yang tidak perlu
if [ -f "index.html" ]; then
    echo "Menghapus root index.html..."
    rm index.html
fi

# 2. Bersihkan file Vite/SPA legacy di apps/compro (karena sudah pindah ke Next.js)
if [ -f "apps/compro/index.html" ]; then
    echo "Menghapus apps/compro/index.html..."
    rm apps/compro/index.html
fi

if [ -f "apps/compro/vite.config.ts" ]; then
    echo "Menghapus apps/compro/vite.config.ts..."
    rm apps/compro/vite.config.ts
fi

if [ -f "apps/compro/src/main.tsx" ]; then
    echo "Menghapus apps/compro/src/main.tsx..."
    rm apps/compro/src/main.tsx
fi

if [ -f "apps/compro/src/App.tsx" ]; then
    echo "Menghapus apps/compro/src/App.tsx..."
    rm apps/compro/src/App.tsx
fi

if [ -d "apps/compro/src/pages" ]; then
    echo "Menghapus folder apps/compro/src/pages (Legacy)..."
    rm -rf apps/compro/src/pages
fi

echo "=== PEMBERSIHAN SELESAI ==="
echo "Aplikasi siap dijalankan dalam mode Hybrid (Next.js + Vite)."
echo "Silakan jalankan: npm run dev"
