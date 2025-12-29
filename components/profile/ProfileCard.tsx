"use client";

import Image from "next/image";
import { LogOut, Pencil, Check } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function ProfileCard() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 flex-shrink-0">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-pink-100 ring-4 ring-white shadow-md">
            {user.avatar ? (
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl">
                🏔️
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition-transform hover:scale-110">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="mb-1 text-2xl font-extrabold text-gray-900">{user.name}</h2>
          <div className="mb-2 flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="font-bold text-green-500">{user.membershipType}</span>
          </div>
          <p className="text-sm font-medium text-gray-400">Member since {user.memberSince}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 rounded-full border-gray-200 font-bold hover:bg-red-50 hover:border-red-200 hover:text-red-600">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

