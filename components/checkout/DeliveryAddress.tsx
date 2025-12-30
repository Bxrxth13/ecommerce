"use client";

import { MapPin } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface DeliveryAddressProps {
  fullName: string;
  address: string;
  saveAddress: boolean;
  onFullNameChange: (name: string) => void;
  onAddressChange: (address: string) => void;
  onSaveAddressChange: (save: boolean) => void;
}

export default function DeliveryAddress({
  fullName,
  address,
  saveAddress,
  onFullNameChange,
  onAddressChange,
  onSaveAddressChange,
}: DeliveryAddressProps) {
  return (
    <div className="rounded-lg border bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
            2
          </span>
          Delivery Address
        </h2>
        <button className="text-gray-400 hover:text-gray-600">↑</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
          <Button variant="outline" className="w-full">
            <MapPin className="mr-2 h-5 w-5" />
            Use Current Location
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Street, Apartment, Zip Code"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => onSaveAddressChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Save this address for next time</span>
          </label>
        </div>
      </div>
    </div>
  );
}

