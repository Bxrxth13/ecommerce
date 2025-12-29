"use client";

import { CreditCard, Settings } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/ui/Button";

export default function PaymentCard() {
  const { user } = useUserStore();

  if (!user || user.paymentMethods.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        </div>
        <p className="mt-4 text-gray-500">No payment methods</p>
      </div>
    );
  }

  const primaryCard = user.paymentMethods.find((pm) => pm.isPrimary) || user.paymentMethods[0];

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
      </div>
      <div className="mb-4 rounded-lg bg-blue-900 p-4 text-white">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase">Primary Card</span>
          <span className="text-xs font-semibold">{primaryCard.brand || "VA"}</span>
        </div>
        <p className="mb-2 text-2xl font-bold">.... {primaryCard.last4}</p>
        <div className="flex items-center justify-between text-sm">
          <span>Expires {primaryCard.expiryMonth}/{String(primaryCard.expiryYear).slice(-2)}</span>
          <span>{primaryCard.cardholderName}</span>
        </div>
      </div>
      <Button variant="secondary" className="w-full">
        <Settings className="mr-2 h-4 w-4" />
        Manage Cards
      </Button>
    </div>
  );
}

