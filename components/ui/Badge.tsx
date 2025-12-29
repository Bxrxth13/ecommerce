import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sale" | "organic" | "best-seller" | "fresh";
}

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        {
          "bg-green-100 text-green-700": variant === "default" || variant === "organic",
          "bg-red-100 text-red-700": variant === "sale",
          "bg-yellow-100 text-yellow-700": variant === "best-seller",
          "bg-green-50 text-green-600": variant === "fresh",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

