"use client";

import { useState } from "react";
import { CreditCard, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export default function PaymentMethod({
  selectedMethod,
  onMethodChange,
}: PaymentMethodProps) {
  const [qrTimer, setQrTimer] = useState(299); // 4:59 in seconds

  // Timer countdown (simplified)
  const minutes = Math.floor(qrTimer / 60);
  const seconds = qrTimer % 60;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
            4
          </span>
          Payment Method
        </h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">↑</button>
      </div>
      <div className="space-y-3">
        {/* UPI / QR Code */}
        <label className={cn(
          "block rounded-2xl border-2 p-4 transition-all cursor-pointer",
          selectedMethod === "upi"
            ? "border-green-500 bg-green-50 shadow-md transform scale-[1.01]"
            : "border-gray-100 hover:border-green-200"
        )}>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={selectedMethod === "upi"}
              onChange={(e) => onMethodChange(e.target.value)}
              className="h-5 w-5 text-green-600 focus:ring-green-500 accent-green-600"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-lg">UPI / QR Code</span>
                <Badge variant="default" className="font-bold tracking-wide">RECOMMENDED</Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Pay securely with any UPI app.
              </p>
            </div>
            <div className="flex items-center gap-2 opacity-60 grayscale filter transition-all group-hover:grayscale-0">
              <span className="text-xs font-bold text-gray-600 border px-1 rounded">GPay</span>
              <span className="text-xs font-bold text-gray-600 border px-1 rounded">PhonePe</span>
            </div>
          </div>
          {selectedMethod === "upi" && (
            <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-6 border border-gray-200 shadow-inner">
              <div className="mb-3 flex h-40 w-40 items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-300">
                <span className="text-xs font-bold text-gray-400">QR Code</span>
              </div>
              <p className="font-bold text-gray-900">Scan QR to pay</p>
              <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full mt-2">
                Timer: {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </p>
            </div>
          )}
        </label>

        {/* Credit / Debit Card */}
        <label className={cn(
          "flex items-center gap-3 rounded-2xl border-2 p-4 transition-all cursor-pointer",
          selectedMethod === "card"
            ? "border-green-500 bg-green-50 shadow-md"
            : "border-gray-100 hover:border-green-200"
        )}>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selectedMethod === "card"}
            onChange={(e) => onMethodChange(e.target.value)}
            className="h-5 w-5 text-green-600 focus:ring-green-500 accent-green-600"
          />
          <CreditCard className={cn("h-6 w-6", selectedMethod === 'card' ? "text-green-600" : "text-gray-400")} />
          <span className="font-bold text-gray-900 text-lg">Credit / Debit Card</span>
        </label>

        {/* Cash on Delivery */}
        <label className={cn(
          "flex items-center gap-3 rounded-2xl border-2 p-4 transition-all cursor-pointer",
          selectedMethod === "cod"
            ? "border-green-500 bg-green-50 shadow-md"
            : "border-gray-100 hover:border-green-200"
        )}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedMethod === "cod"}
            onChange={(e) => onMethodChange(e.target.value)}
            className="h-5 w-5 text-green-600 focus:ring-green-500 accent-green-600"
          />
          <DollarSign className={cn("h-6 w-6", selectedMethod === 'cod' ? "text-green-600" : "text-gray-400")} />
          <span className="font-bold text-gray-900 text-lg">Cash on Delivery</span>
        </label>
      </div>
    </div>
  );
}

