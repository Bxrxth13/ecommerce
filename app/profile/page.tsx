"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useProductStore } from "@/store/productStore";
import { mockUser } from "@/lib/data/users";
import { products } from "@/lib/data/products";
import Sidebar from "@/components/layout/Sidebar";
import ProfileCard from "@/components/profile/ProfileCard";
import OrdersCard from "@/components/profile/OrdersCard";
import AddressCard from "@/components/profile/AddressCard";
import PaymentCard from "@/components/profile/PaymentCard";
import SettingsCard from "@/components/profile/SettingsCard";

export default function ProfilePage() {
  const { user, setUser } = useUserStore();
  const { setProducts } = useProductStore();

  useEffect(() => {
    setProducts(products);
    // Initialize user if not set
    if (!user) {
      setUser(mockUser);
    }
  }, [user, setUser, setProducts]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <Sidebar recentlyViewed={user.recentlyViewed} />

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">My Profile</h1>
          <div className="grid gap-6 lg:grid-cols-2">
            <ProfileCard />
            <OrdersCard />
            <AddressCard />
            <PaymentCard />
            <div className="lg:col-span-2">
              <SettingsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

