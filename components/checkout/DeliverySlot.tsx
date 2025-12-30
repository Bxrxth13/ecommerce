"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface DeliverySlotProps {
  selectedDate: string;
  selectedSlot: string;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: string) => void;
}

const dates = [
  { id: "today", label: "TODAY 24 Oct", value: "2024-10-24" },
  { id: "fri", label: "FRI 25 Oct", value: "2024-10-25" },
  { id: "sat", label: "SAT 26 Oct", value: "2024-10-26" },
  { id: "sun", label: "SUN 27 Oct", value: "2024-10-27" },
];

const timeSlots = [
  { id: "08-10", label: "08:00-10:00", value: "08:00-10:00" },
  { id: "10-12", label: "10:00-12:00", value: "10:00-12:00" },
  { id: "14-16", label: "14:00-16:00", value: "14:00-16:00" },
  { id: "18-20", label: "18:00-20:00", value: "18:00-20:00" },
];

export default function DeliverySlot({
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
}: DeliverySlotProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
            3
          </span>
          Delivery Slot
        </h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">↑</button>
      </div>
      <div className="space-y-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date.id}
              onClick={() => onDateChange(date.value)}
              className={cn(
                "whitespace-nowrap rounded-xl border-2 px-5 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95",
                selectedDate === date.value
                  ? "border-green-500 bg-green-500 text-white shadow-md"
                  : "border-gray-100 bg-white text-gray-600 hover:border-green-200 hover:text-green-600"
              )}
            >
              {date.label}
            </button>
          ))}
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">Available Slots</p>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onSlotChange(slot.value)}
                className={cn(
                  "whitespace-nowrap rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95",
                  selectedSlot === slot.value
                    ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                    : "border-gray-100 bg-white text-gray-600 hover:border-green-200 hover:text-green-600"
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}