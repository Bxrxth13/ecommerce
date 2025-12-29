import { create } from "zustand";
import type { Product, Category } from "@/types";

interface ProductStore {
  products: Product[];
  categories: Category[];
  searchQuery: string;
  selectedCategory: string | null;
  filters: {
    inStock: boolean;
    onSale: boolean;
    organic: boolean;
  };
  sortBy: "popularity" | "price-low" | "price-high" | "name";
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setFilter: (filter: keyof ProductStore["filters"], value: boolean) => void;
  setSortBy: (sort: ProductStore["sortBy"]) => void;
  getFilteredProducts: () => Product[];
  getCategoryProducts: (categoryId: string) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  searchQuery: "",
  selectedCategory: null,
  filters: {
    inStock: true,
    onSale: false,
    organic: false,
  },
  sortBy: "popularity",

  setProducts: (products) => {
    set({ products });
  },

  setCategories: (categories) => {
    set({ categories });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (categoryId) => {
    set({ selectedCategory: categoryId });
  },

  setFilter: (filter, value) => {
    set((state) => ({
      filters: { ...state.filters, [filter]: value },
    }));
  },

  setSortBy: (sort) => {
    set({ sortBy: sort });
  },

  getFilteredProducts: () => {
    const { products, searchQuery, filters, sortBy, selectedCategory } = get();
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.categoryId === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.inStock);
    }
    if (filters.onSale) {
      filtered = filtered.filter((p) => p.isOnSale);
    }
    if (filters.organic) {
      filtered = filtered.filter((p) => p.isOrganic);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popularity":
      default:
        // Keep original order or sort by bestSeller, then rating
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
        break;
    }

    return filtered;
  },

  getCategoryProducts: (categoryId) => {
    return get().products.filter((p) => p.categoryId === categoryId);
  },
}));

