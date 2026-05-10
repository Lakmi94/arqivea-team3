"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FilterState = Record<string, string[]>;

interface FilterContextType {
  selectedFilters: FilterState;
  toggleFilter: (categoryId: string, option: string) => void;
  clearFilters: () => void;
  showResults: boolean;
  setShowResults: (val: boolean) => void;
  appliedFilters: string[];
  setAppliedFilters: (val: string[]) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  appliedSearchQuery: string;
  setAppliedSearchQuery: (val: string) => void;
  resetAll: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});
  const [showResults, setShowResults] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");

  const toggleFilter = (categoryId: string, option: string) => {
    const currentCategory = selectedFilters[categoryId] || [];
    const isSelected = currentCategory.includes(option);
    const newCategory = isSelected
      ? currentCategory.filter((item) => item !== option)
      : [...currentCategory, option];

    const newFilters = {
      ...selectedFilters,
      [categoryId]: newCategory,
    };

    setSelectedFilters(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setShowResults(false);
    setAppliedFilters([]);
  };

  const resetAll = () => {
    setSelectedFilters({});
    setShowResults(false);
    setAppliedFilters([]);
    setSearchQuery("");
    setAppliedSearchQuery("");
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, toggleFilter, clearFilters, showResults, setShowResults, appliedFilters, setAppliedFilters, searchQuery, setSearchQuery, appliedSearchQuery, setAppliedSearchQuery, resetAll }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}