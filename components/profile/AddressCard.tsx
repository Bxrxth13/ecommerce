"use client";

import { MapPin, Pencil, Home } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/ui/Button";

export default function AddressCard() {
  const { user } = useUserStore();

  if (!user || user.addresses.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
        </div>
        <p className="mt-4 text-gray-500">No saved addresses</p>
      </div>
    );
  }

  const defaultAddress = user.addresses.find((addr) => addr.isDefault) || user.addresses[0];

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
      </div>
      <div className="mb-4 rounded-lg border bg-gray-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Home className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">
            {defaultAddress.label} (DEFAULT)
          </span>
        </div>
        <p className="text-gray-700">{defaultAddress.street}</p>
        <p className="text-gray-700">
          {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}
        </p>
      </div>
      <Button variant="secondary" className="w-full">
        <Pencil className="mr-2 h-4 w-4" />
        Edit Address
      </Button>
    </div>
  );
}

