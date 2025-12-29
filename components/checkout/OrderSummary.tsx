"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function OrderSummary() {
  const { items, getSubtotal, getDeliveryFee, getTaxes, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const taxes = getTaxes();
  const total = getTotal();

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-extrabold text-gray-900">Order Summary</h2>
      <p className="mb-6 text-sm font-medium text-gray-500">{items.length} Items in cart</p>

      {/* Items */}
      <div className="mb-6 space-y-5">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 box-border bg-gray-50">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 line-clamp-1">{item.product.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm font-medium text-gray-400">
                  Qty: {item.quantity}
                </p>
                <p className="font-bold text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-dashed border-gray-200 pt-6">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Item Total</span>
          <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Delivery Fee</span>
          <span className={deliveryFee === 0 ? "font-bold text-green-600" : "font-bold text-gray-900"}>
            {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Taxes & Charges</span>
          <span className="font-bold text-gray-900">{formatPrice(taxes)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between border-t border-gray-100 pt-4">
        <span className="text-lg font-bold text-gray-900">To Pay</span>
        <span className="text-3xl font-extrabold text-gray-900">{formatPrice(total)}</span>
      </div>
    </div>
  );
}

