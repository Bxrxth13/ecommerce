"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, User, MapPin, Zap, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { openCart, getItemCount, getTotal } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = getItemCount();
  const cartTotal = getTotal();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isHomePage = pathname === "/";

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-[#102215]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white">
                <Image src="/logo.jpg" alt="FreshMarket" fill className="object-cover" />
              </div>
              <span className="text-xl font-[700] text-white">FreshMarket</span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search for fruits, vegetables, groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-full bg-[#1a3a24] border border-[#2a4a34] pl-12 pr-4 text-[15px] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13EC49]/50"
                />
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Delivery Info Pills (Desktop) */}
              <div className="hidden xl:flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-full border border-[#2a4a34] bg-[#1a3a24] px-4 py-2 text-sm font-medium text-white hover:border-[#13EC49]/50 transition-colors">
                  <MapPin className="h-4 w-4 text-[#13EC49]" />
                  <span className="text-gray-300">Delivering to</span>
                  <span className="font-[600] text-white">Home - 123 Mai...</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                <div className="flex items-center gap-2 rounded-full border border-[#2a4a34] bg-[#1a3a24] px-4 py-2 text-sm font-[600] text-white">
                  <Zap className="h-4 w-4 fill-[#13EC49] text-[#13EC49]" />
                  <span>12 mins</span>
                </div>
              </div>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="group flex items-center gap-2 rounded-full bg-[#13EC49] px-5 py-2.5 text-[#102215] transition-all hover:bg-[#0EA835] active:scale-95"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-[700]">Cart</span>
                {mounted && cartItemCount > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#102215] text-xs font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Account Button (Desktop) */}
              <Link
                href="/profile"
                className="hidden lg:flex items-center gap-2 text-sm font-[500] text-white hover:text-[#13EC49] transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3 lg:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-full bg-[#1a3a24] border border-[#2a4a34] pl-12 pr-4 text-[15px] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#13EC49]/50"
                />
              </div>
            </form>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
