"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import ProductGrid from "@/components/product/ProductGrid";
import Sidebar from "@/components/layout/Sidebar";
import { Apple, Egg, Wheat, Fish, Package, Wine } from "lucide-react";
import { cn } from "@/lib/utils";

const departments = [
  { id: "fruits", name: "Fresh Produce", icon: Apple, categoryId: "fruits" },
  { id: "dairy", name: "Dairy & Eggs", icon: Egg, categoryId: "dairy-eggs" },
  { id: "bakery", name: "Bakery", icon: Wheat, categoryId: "bakery" },
  { id: "meat", name: "Meat & Seafood", icon: Fish, categoryId: "meat-fish" },
  { id: "staples", name: "Pantry Staples", icon: Package, categoryId: "staples" },
  { id: "beverages", name: "Beverages", icon: Wine, categoryId: "beverages" },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const {
    setProducts,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    filters,
    setFilter,
    sortBy,
    setSortBy,
    setSearchQuery,
    getFilteredProducts,
  } = useProductStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setProducts(products);
    setCategories(categories);

    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams, setProducts, setCategories, setSelectedCategory, setSearchQuery]);

  const filteredProducts = getFilteredProducts();
  const paginatedProducts = filteredProducts.slice(
    0,
    currentPage * itemsPerPage
  );
  const hasMore = paginatedProducts.length < filteredProducts.length;

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar - Fixed to left wall */}
      <aside className="hidden lg:block w-[220px] flex-shrink-0 border-r border-[#E5E7EB] bg-white">
        <div className="sticky top-[73px] p-6 space-y-8">
          {/* Departments */}
          <div>
            <h3 className="mb-5 text-[11px] font-[700] uppercase tracking-[0.1em] text-[#6B7280]">
              Departments
            </h3>
            <div className="space-y-1">
              {departments.map((dept) => {
                const Icon = dept.icon;
                const isActive = selectedCategory === dept.categoryId;
                return (
                  <button
                    key={dept.id}
                    onClick={() =>
                      setSelectedCategory(isActive ? null : dept.categoryId)
                    }
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-[500] transition-all duration-200",
                      isActive
                        ? "bg-[#13EC49] text-white shadow-md"
                        : "text-[#0D1B11] hover:bg-gray-100"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-[#6B7280]")} />
                    {dept.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="mb-5 text-[11px] font-[700] uppercase tracking-[0.1em] text-[#6B7280]">
              Filter By
            </h3>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3 group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilter("inStock", e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500 group-hover:border-green-400"
                  />
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="14"
                    height="14"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[14px] font-[500] text-[#0D1B11]">In Stock</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => setFilter("onSale", e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500 group-hover:border-green-400"
                  />
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="14"
                    height="14"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[14px] font-[500] text-[#0D1B11]">On Sale</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.organic}
                    onChange={(e) => setFilter("organic", e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500 group-hover:border-green-400"
                  />
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="14"
                    height="14"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[14px] font-[500] text-[#0D1B11]">Organic</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-[13px] font-[500] text-[#6B7280]">
          <Link href="/" className="hover:text-[#13EC49] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-300">›</span>
          <Link href="/categories" className="hover:text-[#13EC49] transition-colors">
            Groceries
          </Link>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-[#0D1B11] font-[600]">Fresh Produce</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[32px] font-[800] tracking-tight text-[#0D1B11] sm:text-[40px] leading-tight">Fresh Produce</h1>
            <p className="mt-2 text-[16px] font-[400] text-[#6B7280]">
              {filteredProducts.length} items hand-picked for freshness
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[14px] font-[500] text-[#6B7280]">Sort by:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 pr-10 text-[14px] font-[600] text-[#0D1B11] shadow-sm focus:border-[#13EC49] focus:outline-none focus:ring-2 focus:ring-[#13EC49]/20"
              >
                <option value="popularity">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={paginatedProducts} showQuantity={true} />

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="rounded-full border border-gray-200 bg-white px-8 py-3 font-bold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

