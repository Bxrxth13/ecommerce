"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import ContactInfo from "@/components/checkout/ContactInfo";
import DeliveryAddress from "@/components/checkout/DeliveryAddress";
import DeliverySlot from "@/components/checkout/DeliverySlot";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, addOrder, addAddress } = useUserStore();

  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [email, setEmail] = useState("guest@example.com");
  const [fullName, setFullName] = useState("John Doe");
  const [address, setAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2024-10-24");
  const [selectedSlot, setSelectedSlot] = useState("10:00-12:00");
  const [paymentMethod, setPaymentMethod] = useState("upi");
                                            
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="mb-4 text-gray-500">Your cart is empty.</p>
        <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  const handleConfirmOrder = () => {
    // Create order
    const order = {
      id: `order-${Date.now()}`,
      items,
      total: getTotal(),
      subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      deliveryFee: 0,
      taxes: getTotal() * 0.085,
      status: "confirmed" as const,
      deliveryDate: selectedDate,
      deliverySlot: selectedSlot,
      address: {
        id: "temp-addr",
        label: "HOME",
        fullName,
        street: address,
        city: "New York",
        state: "NY",
        zipCode: "10012",
        isDefault: true,
      },
      paymentMethod: {
        id: "temp-pm",
        type: paymentMethod as "card" | "upi" | "cod",
        isPrimary: true,
      },
      createdAt: new Date().toISOString(),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };

    addOrder(order);
    if (saveAddress && address) {
      addAddress({
        id: `addr-${Date.now()}`,
        label: "HOME",
        fullName,
        street: address,
        city: "New York",
        state: "NY",
        zipCode: "10012",
        isDefault: false,
      });
    }
    clearCart();
    router.push("/profile?order=success");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
          <p className="font-medium text-gray-500">Complete your order in 3 simple steps</p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 border border-green-100">
          <Lock className="h-4 w-4 text-green-600" />
          <span className="text-xs font-bold uppercase tracking-wide text-green-700">Secure Checkout</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Checkout Steps */}
        <div className="lg:col-span-2 space-y-6">
          <ContactInfo
            phone={phone}
            email={email}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
          />
          <DeliveryAddress
            fullName={fullName}
            address={address}
            saveAddress={saveAddress}
            onFullNameChange={setFullName}
            onAddressChange={setAddress}
            onSaveAddressChange={setSaveAddress}
          />
          <DeliverySlot
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateChange={setSelectedDate}
            onSlotChange={setSelectedSlot}
          />
          <PaymentMethod
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <OrderSummary />
            <Button
              size="lg"
              onClick={handleConfirmOrder}
              className="mt-6 w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-green-200"
            >
              Confirm Order
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs font-bold">✔</span>
              <span>100% Secure Transaction</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

