"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Milk, Wheat, Egg, Banana, Circle, ArrowRight } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import CategoryCard from "@/components/category/CategoryCard";
import ProductCard from "@/components/product/ProductCard";
import { useRouter } from "next/navigation";

const popularItems = [
  { label: "Milk", icon: Milk },
  { label: "Bread", icon: Wheat },
  { label: "Eggs", icon: Egg },
  { label: "Bananas", icon: Banana },
  { label: "Onion", icon: Circle },
];

const quickEssentials = products.filter((p) =>
  ["whole-milk", "sliced-bread", "organic-eggs", "organic-bananas"].includes(p.id)
);

export default function HomePage() {
  const router = useRouter();
  const { setProducts, setCategories } = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(products);
    setCategories(categories);
  }, [setProducts, setCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="pt-16 pb-20 text-center px-4">
        <h1 className="mx-auto mb-4 max-w-4xl text-[36px] font-[900] tracking-tighter text-[#0D1B11] md:text-[48px] lg:text-[64px] leading-[1.1]">
          What are you looking for{" "}
          <span className="text-[#13EC49]">today?</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-[#6B7280]">
          Fresh produce, daily staples, and more delivered in minutes.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mx-auto mb-10 max-w-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-full">
          <Search className="absolute left-[24px] top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for milk, vegetable,chips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[64px] w-full rounded-full border-none bg-white pl-[56px] pr-[128px] text-[18px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13EC49]"
          />
          <button
            type="submit"
            className="absolute bottom-[6px] right-[6px] top-[6px] rounded-full bg-[#13EC49] px-8 text-base font-[700] text-[#0D1B11] transition-transform hover:scale-105 active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Popular Items */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="mr-2 text-sm font-bold uppercase tracking-wide text-gray-400">
            Popular:
          </span>
          {popularItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => router.push(`/products?search=${encodeURIComponent(item.label)}`)}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:ring-1 hover:ring-green-500/20"
              >
                <Icon className="h-4 w-4 text-gray-400 group-hover:text-green-500" />
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        {/* Shop by Category */}
        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <Link
              href="/categories"
              className="group flex items-center gap-1 font-semibold text-green-500 hover:text-green-600"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Quick Essentials (Product Cards) */}
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Quick Essentials
              </h2>
              <p className="mt-1 text-gray-500">Items you might need everyday.</p>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-1 font-semibold text-green-500 hover:text-green-600"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickEssentials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
