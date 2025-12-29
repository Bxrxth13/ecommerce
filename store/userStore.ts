import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Address, PaymentMethod, Order, Product } from "@/types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  updateProfile: (updates: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (addressId: string, updates: Partial<Address>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addPaymentMethod: (paymentMethod: PaymentMethod) => void;
  updatePaymentMethod: (paymentMethodId: string, updates: Partial<PaymentMethod>) => void;
  removePaymentMethod: (paymentMethodId: string) => void;
  setPrimaryPaymentMethod: (paymentMethodId: string) => void;
  addOrder: (order: Order) => void;
  addToRecentlyViewed: (product: Product) => void;
  toggleNotifications: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, address],
            },
          };
        });
      },

      updateAddress: (addressId, updates) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) =>
                addr.id === addressId ? { ...addr, ...updates } : addr
              ),
            },
          };
        });
      },

      removeAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.filter(
                (addr) => addr.id !== addressId
              ),
            },
          };
        });
      },

      setDefaultAddress: (addressId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === addressId,
              })),
            },
          };
        });
      },

      addPaymentMethod: (paymentMethod) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: [...state.user.paymentMethods, paymentMethod],
            },
          };
        });
      },

      updatePaymentMethod: (paymentMethodId, updates) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: state.user.paymentMethods.map((pm) =>
                pm.id === paymentMethodId ? { ...pm, ...updates } : pm
              ),
            },
          };
        });
      },

      removePaymentMethod: (paymentMethodId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: state.user.paymentMethods.filter(
                (pm) => pm.id !== paymentMethodId
              ),
            },
          };
        });
      },

      setPrimaryPaymentMethod: (paymentMethodId) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              paymentMethods: state.user.paymentMethods.map((pm) => ({
                ...pm,
                isPrimary: pm.id === paymentMethodId,
              })),
            },
          };
        });
      },

      addOrder: (order) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              orders: [order, ...state.user.orders],
            },
          };
        });
      },

      addToRecentlyViewed: (product) => {
        set((state) => {
          if (!state.user) return state;
          const filtered = state.user.recentlyViewed.filter(
            (p) => p.id !== product.id
          );
          return {
            user: {
              ...state.user,
              recentlyViewed: [product, ...filtered].slice(0, 10),
            },
          };
        });
      },

      toggleNotifications: () => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              notificationsEnabled: !state.user.notificationsEnabled,
            },
          };
        });
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
);

