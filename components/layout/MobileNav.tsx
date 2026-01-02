"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/categories", icon: Grid },
  { label: "Search", href: "/products", icon: Search },
  { label: "cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { openCart, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isCart = item.href === "/cart";

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isCart ? handleCartClick : undefined}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-3 transition-colors",
                isActive ? "text-green-600" : "text-gray-600"
              )}
            >
              {isCart && cartItemCount > 0 && (
                <span className="absolute right-2 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
              {item.label === "Search" ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                  <Icon className="h-6 w-6" />
                </div>
              ) : (
                <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

