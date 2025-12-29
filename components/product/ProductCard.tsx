"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  showQuantity?: boolean;
}

export default function ProductCard({ product, showQuantity = false }: ProductCardProps) {
  const { addItem, getItemQuantity, updateQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);
  const hasQuantity = quantity > 0;

  const handleAdd = () => {
    addItem(product);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      <Link href={`/products/${product.id}`} className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#F6F8F6]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge variant="best-seller" className="rounded-full shadow-sm">Best Seller</Badge>
          )}
          {product.isOnSale && <Badge variant="sale" className="rounded-full shadow-sm">SALE</Badge>}
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[17px] font-[600] leading-snug text-[#0D1B11] line-clamp-2 min-h-[44px]">
            {product.name}
          </h3>
          <p className="text-[13px] font-[500] text-[#6B7280] mt-1">
            {product.unit || "each"}
          </p>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs font-medium text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-[20px] font-[800] text-[#0D1B11]">
              {formatPrice(product.price)}
            </span>
          </div>

          {showQuantity && hasQuantity ? (
            <div className="flex h-[36px] items-center rounded-full bg-[#13EC49] shadow-sm transition-all w-fit">
              <button
                onClick={handleDecrease}
                className="flex h-full w-[32px] items-center justify-center text-white transition-colors active:scale-95"
              >
                <span className="text-lg font-bold">−</span>
              </button>
              <span className="min-w-[1.5rem] text-center text-[14px] font-[700] text-white">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="flex h-full w-[32px] items-center justify-center text-white transition-colors active:scale-95"
              >
                <span className="text-lg font-bold">+</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex h-[36px] items-center justify-center rounded-full bg-[rgba(19,236,73,0.10)] px-[16px] text-[14px] font-[700] text-[#0EA835] transition-all hover:bg-[#13EC49] hover:text-[#0D1B11] hover:shadow-[0_8px_20px_rgba(19,236,73,0.20)] active:scale-95"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

