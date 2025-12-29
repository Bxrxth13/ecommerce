"use client";

import Image from "next/image";
import { ShoppingBag, RotateCcw } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { formatPrice, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function OrdersCard() {
  const { user } = useUserStore();

  if (!user || user.orders.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
        </div>
        <p className="mt-4 text-gray-500">No orders yet</p>
      </div>
    );
  }

  const latestOrder = user.orders[0];
  const itemImages = latestOrder.items.slice(0, 3).map((item) => item.product.image);
  const remainingCount = latestOrder.items.length - 3;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">My Orders</h3>
        </div>
        <Badge variant="default" className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">
          {latestOrder.status.toUpperCase()}
        </Badge>
      </div>
      <div className="mb-6">
        <p className="text-3xl font-extrabold text-gray-900">
          {formatPrice(latestOrder.total)}
        </p>
        <p className="font-medium text-gray-400">
          {formatDate(latestOrder.deliveryDate)} • {latestOrder.itemCount} Items
        </p>
      </div>
      <div className="mb-6 flex gap-3">
        {itemImages.map((img, idx) => (
          <div key={idx} className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-100">
            <Image src={img} alt={`Item ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-sm font-bold text-gray-600">
            +{remainingCount}
          </div>
        )}
      </div>
      <Button variant="secondary" className="w-full rounded-full font-bold">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reorder
      </Button>
    </div>
  );
}

