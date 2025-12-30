"use client";

import { Phone, Mail } from "lucide-react";
import Input from "@/components/ui/Input";

interface ContactInfoProps {
  phone: string;
  email: string;
  onPhoneChange: (phone: string) => void;
  onEmailChange: (email: string) => void;
}

export default function ContactInfo({
  phone,
  email,
  onPhoneChange,
  onEmailChange,
}: ContactInfoProps) {
  return (
    <div className="rounded-lg border bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
            1
          </span>
          Contact Info
        </h2>
        <button className="text-gray-400 hover:text-gray-600">↑</button>
      </div>
      <div className="mb-4">
        <a href="#" className="text-sm text-green-600 hover:text-green-700">
          Already have an account?
        </a>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            icon={<Phone className="h-4 w-4" />}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email (Optional)
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            icon={<Mail className="h-4 w-4" />}
            placeholder="guest@example.com"
          />
        </div>
      </div>
    </div>
  );
}

