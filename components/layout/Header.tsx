"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const { openCart, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = getItemCount();

  return (
    <>
      <header className="fixed top-0 w-full z-50 border-b border-[#E5E7EB] bg-[#102215] shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 bg-white transition-transform group-hover:scale-105">
                <Image src="/logo.jpg" alt="FreshMarket" fill className="object-cover" />
              </div>
              <span className="text-2xl font-[800] text-white tracking-tight">FreshMarket</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {[
                { label: "Home", href: "/" },
                { label: "Groceries", href: "/categories" },
                { label: "Products", href: "/products" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-[600] text-gray-300 hover:text-[#13EC49] transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              {/* Cart Button */}
              <button
                onClick={openCart}
                className="group flex items-center gap-2 rounded-full bg-[#13EC49] p-3 lg:px-6 lg:py-3 text-[#102215] transition-all hover:bg-[#0EA835] active:scale-95 shadow-lg shadow-green-900/20"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline font-[700] text-[15px]">Cart</span>
                {mounted && cartItemCount > 0 && (
                  <span className="flex h-5 w-5 lg:h-6 lg:w-6 items-center justify-center rounded-full bg-[#102215] text-[10px] lg:text-xs font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Account Button (Desktop) */}
              <Link
                href="/profile"
                className="hidden lg:flex items-center gap-2 text-sm font-[600] text-white hover:text-[#13EC49] transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a3a24] hover:bg-[#2a4a34] transition-colors">
                  <User className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
