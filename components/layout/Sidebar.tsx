"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Product } from "@/types";

interface SidebarProps {
  recentlyViewed?: Product[];
}

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar({ recentlyViewed = [] }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-white lg:block">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6">
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-4 py-3 font-medium transition-all hover:-translate-x-[-4px]",
                  isActive
                    ? "bg-green-100 text-green-700 font-bold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "fill-green-700 text-green-700" : "text-gray-400")} />
                <span className="">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Recently Viewed
            </h3>
            <div className="flex gap-2">
              {recentlyViewed.slice(0, 3).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="relative h-12 w-12 overflow-hidden rounded-lg"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

