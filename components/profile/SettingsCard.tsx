"use client";

import { Bell, Lock, ArrowRight, Menu } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function SettingsCard() {
  const { user, toggleNotifications } = useUserStore();

  if (!user) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
          <Menu className="h-5 w-5 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
      </div>

      {/* Notifications */}
      <div className="mb-4 flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Notifications</p>
            <p className="text-sm text-gray-500">
              {user.notificationsEnabled ? "Email & SMS enabled" : "Notifications disabled"}
            </p>
          </div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={user.notificationsEnabled}
            onChange={toggleNotifications}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300"></div>
        </label>
      </div>

      {/* Security */}
      <div className="mb-4 flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Security</p>
            <p className="text-sm text-gray-500">
              Last changed {user.lastPasswordChange ? formatDate(user.lastPasswordChange) : "N/A"}
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>

      <Button variant="secondary" className="w-full">
        <Menu className="mr-2 h-4 w-4" />
        Full Settings
      </Button>
    </div>
  );
}

