
"use client";

import { useState, useMemo } from 'react';
import { ARTICLES, Article } from '@cbp/core';

export const usePublicArticles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // 1. Get Categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(ARTICLES.map(a => a.category));
    return ['Semua', ...Array.from(cats)];
  }, []);

  // 2. Filter & Search Logic
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // 3. Featured Article (First item of filtered or all)
  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  
  // 4. List Articles (Exclude featured from list if needed, or just list all)
  // Strategi: Jika sedang filter/search, tampilkan semua di grid. Jika default, pisahkan featured.
  const gridArticles = useMemo(() => {
    if (searchQuery || selectedCategory !== 'Semua') return filteredArticles;
    return filteredArticles.slice(1);
  }, [filteredArticles, searchQuery, selectedCategory]);

  const getArticleById = (id: string) => ARTICLES.find(a => a.id === id);

  const getRelatedArticles = (currentId: string, category: string) => {
    return ARTICLES
      .filter(a => a.category === category && a.id !== currentId)
      .slice(0, 3);
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
    getRelatedArticles
  };
};
