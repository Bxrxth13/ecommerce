"use client";

import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTaxes,
    getTotal,
    getItemCount,
    getFreeDeliveryProgress,
    getRemainingForFreeDelivery,
  } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const taxes = getTaxes();
  const total = getTotal();
  const itemCount = getItemCount();
  const progress = getFreeDeliveryProgress();
  const remaining = getRemainingForFreeDelivery();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-[480px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] transition-transform">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-[24px] py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#13EC49]/10">
                <span className="text-lg">🛒</span>
              </div>
              <h2 className="text-lg font-[700] text-[#0D1B11]">
                My Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Delivery Progress */}
          {remaining > 0 && (
            <div className="border-b border-[#E5E7EB] bg-[#F6F8F6] px-[24px] py-3">
              <p className="mb-2 text-sm text-[#6B7280]">
                Add {formatPrice(remaining)} more for free delivery!
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-[#13EC49] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{Math.round(progress)}%</p>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-2xl">🛒</span>
                </div>
                <p className="mb-2 font-medium text-gray-900">Your cart is empty</p>
                <p className="text-sm text-gray-500">Start adding items to your cart</p>
              </div>
            ) : (
              <div className="space-y-[16px]">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-[16px] py-[24px] border-b border-[#E5E7EB] last:border-0 items-start">
                    <Link
                      href={`/products/${item.product.id}`}
                      onClick={closeCart}
                      className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-[12px] bg-gray-50 border border-[#E5E7EB]"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between py-1 h-full min-h-[80px]">
                      <div>
                        <Link
                          href={`/products/${item.product.id}`}
                          onClick={closeCart}
                          className="text-[16px] font-[600] text-[#0D1B11] hover:text-[#13EC49] line-clamp-1 leading-tight"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[12px] font-[500] text-[#6B7280] mt-1">
                          {item.product.unit && `${item.product.unit} • `}
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded-full p-1 shadow-sm h-[32px]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[#0D1B11]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[16px] font-[800] text-[#0D1B11]">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#E5E7EB] bg-white p-[24px]">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-medium text-[#0D1B11]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "font-medium text-[#13EC49]" : "font-medium text-[#0D1B11]"}>
                    {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Taxes</span>
                  <span className="font-medium text-[#0D1B11]">
                    {taxes > 0 ? formatPrice(taxes) : "Calculated at checkout"}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex justify-between border-t border-[#E5E7EB] pt-4">
                <span className="text-lg font-[700] text-[#0D1B11]">Total</span>
                <span className="text-xl font-[800] text-[#0D1B11]">{formatPrice(total)}</span>
              </div>
              <Link href="/checkout" onClick={closeCart}>
                <button className="flex w-full h-[56px] items-center justify-center rounded-[16px] bg-[#13EC49] text-[18px] font-[700] text-[#0D1B11] shadow-[0_8px_20px_rgba(19,236,73,0.20)] transition-transform active:scale-[0.98]">
                  Checkout {formatPrice(total)}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
