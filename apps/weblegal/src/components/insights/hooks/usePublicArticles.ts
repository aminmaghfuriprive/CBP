
"use client";

import { useState, useMemo } from 'react';
import { ARTICLES } from '@cbp/core';

export const usePublicArticles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // 1. Kategori Fixed sesuai Divisi (Tanpa kata "Divisi")
  const categories = [
    'Semua',
    'Hukum Umum & Litigasi',
    'Perizinan & Bisnis',
    'Pertanahan & Agraria',
    'Legal Administratif & Korporasi'
  ];

  // Helper untuk mapping kategori artikel (mock data) ke Divisi
  const matchCategory = (articleCategory: string, filterCategory: string) => {
    if (filterCategory === 'Semua') return true;
    
    const ac = articleCategory.toLowerCase();
    
    // Logic Mapping Sederhana
    if (filterCategory === 'Hukum Umum & Litigasi') {
      return ac.includes('wawasan') || ac.includes('litigasi') || ac.includes('pidana') || ac.includes('perdata');
    }
    if (filterCategory === 'Perizinan & Bisnis') {
      return ac.includes('izin') || ac.includes('bisnis') || ac.includes('haki');
    }
    if (filterCategory === 'Pertanahan & Agraria') {
      return ac.includes('tanah') || ac.includes('agraria') || ac.includes('properti');
    }
    if (filterCategory === 'Legal Administratif & Korporasi') {
      return ac.includes('korporasi') || ac.includes('kontrak') || ac.includes('legal');
    }
    
    return false;
  };

  // 2. Filter & Search Logic
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = matchCategory(article.category, selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  
  const gridArticles = useMemo(() => {
    // Jika sedang search atau filter, tampilkan semua hasil (termasuk yang pertama)
    // Jika default view, yang pertama jadi Hero, sisanya grid
    if (searchQuery || selectedCategory !== 'Semua') return filteredArticles;
    return filteredArticles.slice(1);
  }, [filteredArticles, searchQuery, selectedCategory]);

  const getArticleById = (id: string) => ARTICLES.find(a => a.id === id);

  const getAdjacentArticles = (currentId: string) => {
    const index = ARTICLES.findIndex(a => a.id === currentId);
    if (index === -1) return { prev: null, next: null };

    return {
      prev: index > 0 ? ARTICLES[index - 1] : null,
      next: index < ARTICLES.length - 1 ? ARTICLES[index + 1] : null
    };
  };

  return {
    categories,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    featuredArticle,
    gridArticles,
    getArticleById,
    getAdjacentArticles
  };
};
