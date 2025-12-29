"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import CategoryCard from "@/components/category/CategoryCard";
import { TrendingUp, Percent, Leaf, Snowflake, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

const filterOptions = [
  { id: "all", label: "All Items", icon: Grid },
  { id: "popular", label: "Most Popular", icon: TrendingUp },
  { id: "deals", label: "% Deals", icon: Percent },
  { id: "organic", label: "Organic", icon: Leaf },
  { id: "frozen", label: "Frozen", icon: Snowflake },
];

export default function CategoriesPage() {
  const { setCategories, setProducts, selectedCategory, setSelectedCategory } = useProductStore();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setCategories(categories);
    setProducts(products);
  }, [setCategories, setProducts]);

  const filteredCategories = categories;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">All Categories</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Shop by Category</h1>
        <p className="text-gray-600">
          Fresh produce, daily essentials, and household items delivered fast.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {filterOptions.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-95",
                isActive
                  ? "border-green-600 bg-green-600 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-600 hover:border-green-500 hover:text-green-600 hover:shadow-sm"
              )}
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

