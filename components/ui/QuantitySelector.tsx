"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const canDecrease = quantity > min;
  const canIncrease = max ? quantity < max : true;

  return (
    <div className={cn("flex items-center gap-1 bg-green-500 rounded-full px-1 shadow-md", size === "md" ? "h-11 min-w-[120px]" : "h-9 min-w-[100px]", className)}>
      <button
        onClick={onDecrease}
        disabled={!canDecrease}
        className={cn(
          "flex items-center justify-center rounded-full text-white transition-all hover:bg-green-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" ? "h-7 w-7" : "h-9 w-9"
        )}
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-5 w-5 stroke-[3]"} />
      </button>
      <span
        className={cn(
          "flex-1 text-center font-bold text-white",
          size === "sm" ? "text-sm" : "text-lg"
        )}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={!canIncrease}
        className={cn(
          "flex items-center justify-center rounded-full text-white transition-all hover:bg-green-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" ? "h-7 w-7" : "h-9 w-9"
        )}
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-5 w-5 stroke-[3]"} />
      </button>
    </div>
  );
}

