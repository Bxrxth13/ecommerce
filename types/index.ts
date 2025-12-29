export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categoryId: string;
  inStock: boolean;
  isOrganic?: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  unit?: string; // e.g., "lb", "gal", "loaf", "each"
  packSize?: string;
  highlights?: string[];
  rating?: number;
  reviews?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string; // "HOME", "WORK", etc.
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  phone?: string;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "cod";
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cardholderName?: string;
  brand?: string; // "Visa", "Mastercard", etc.
  isPrimary: boolean;
  upiId?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  deliveryDate: string;
  deliverySlot: string;
  address: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  membershipType?: string; // "Fresh Pass Member"
  memberSince?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  recentlyViewed: Product[];
  notificationsEnabled: boolean;
  lastPasswordChange?: string;
}

export interface DeliverySlot {
  date: string;
  label: string; // "TODAY 24 Oct", "FRI 25 Oct"
  slots: {
    start: string;
    end: string;
    available: boolean;
  }[];
}

