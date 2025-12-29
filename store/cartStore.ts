import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, TAX_RATE } from "@/lib/constants";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (productId: string) => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTaxes: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getFreeDeliveryProgress: () => number;
  getRemainingForFreeDelivery: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find(
          (item) => item.product.id === productId
        );
        return item?.quantity || 0;
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      getTaxes: () => {
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        return (subtotal + deliveryFee) * TAX_RATE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        const taxes = get().getTaxes();
        return subtotal + deliveryFee + taxes;
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getFreeDeliveryProgress: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= FREE_DELIVERY_THRESHOLD) return 100;
        return (subtotal / FREE_DELIVERY_THRESHOLD) * 100;
      },

      getRemainingForFreeDelivery: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
        return FREE_DELIVERY_THRESHOLD - subtotal;
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

