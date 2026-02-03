
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

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  
  const gridArticles = useMemo(() => {
    if (searchQuery || selectedCategory !== 'Semua') return filteredArticles;
    return filteredArticles.slice(1);
  }, [filteredArticles, searchQuery, selectedCategory]);

  const getArticleById = (id: string) => ARTICLES.find(a => a.id === id);

  // New: Logic for Prev/Next Navigation
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
