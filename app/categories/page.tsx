"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import CategoryCard from "@/components/category/CategoryCard";
import { TrendingUp, Percent, Leaf, Snowflake, Grid } from "lucide-react";
import { useRouter } from "next/navigation";

// ... existing imports
import { cn } from "@/lib/utils";

const filterOptions = [
  { id: "all", label: "All Items", icon: Grid },
  { id: "popular", label: "Most Popular", icon: TrendingUp },
  { id: "deals", label: "% Deals", icon: Percent },
  { id: "organic", label: "Organic", icon: Leaf },
  { id: "frozen", label: "Frozen", icon: Snowflake },
];

export default function CategoriesPage() {
  const router = useRouter();
  const { setCategories, setProducts } = useProductStore();

  useEffect(() => {
    setCategories(categories);
    setProducts(products);
  }, [setCategories, setProducts]);

  const handleFilterClick = (filterId: string) => {
    switch (filterId) {
      case "all":
        router.push("/products");
        break;
      case "popular":
        router.push("/products?sort=popularity");
        break;
      case "deals":
        router.push("/products?onSale=true");
        break;
      case "organic":
        router.push("/products?organic=true");
        break;
      case "frozen":
        router.push("/products?search=frozen");
        break;
      default:
        router.push("/products");
    }
  };

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
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 transition-all hover:border-green-500 hover:text-green-600 hover:scale-105 active:scale-95 shadow-sm"
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

