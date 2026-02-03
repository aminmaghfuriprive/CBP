
"use client";

import { useState, useMemo } from 'react';
import { useRegulationLogic } from '@cbp/core';

export const usePublicLibrary = () => {
  const { regulations } = useRegulationLogic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedYear, setSelectedYear] = useState('Semua');

  // Extract unique filter options dynamically
  const filterOptions = useMemo(() => {
    return {
      types: ['Semua', ...Array.from(new Set(regulations.map(r => r.type)))],
      categories: ['Semua', ...Array.from(new Set(regulations.map(r => r.category)))],
      years: ['Semua', ...Array.from(new Set(regulations.map(r => r.year))).sort((a, b) => Number(b) - Number(a))]
    };
  }, [regulations]);

  // Filter Logic
  const filteredRegulations = useMemo(() => {
    return regulations.filter(reg => {
      const matchSearch = 
        reg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        reg.number.includes(searchQuery);
      
      const matchType = selectedType === 'Semua' || reg.type === selectedType;
      const matchCategory = selectedCategory === 'Semua' || reg.category === selectedCategory;
      const matchYear = selectedYear === 'Semua' || reg.year.toString() === selectedYear.toString();

      return matchSearch && matchType && matchCategory && matchYear;
    });
  }, [regulations, searchQuery, selectedType, selectedCategory, selectedYear]);

  return {
    regulations: filteredRegulations,
    filterOptions,
    filters: { searchQuery, selectedType, selectedCategory, selectedYear },
    setters: { setSearchQuery, setSelectedType, setSelectedCategory, setSelectedYear }
  };
};
