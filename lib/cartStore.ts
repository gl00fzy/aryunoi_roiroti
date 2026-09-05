// lib/cartStore.ts
// Zustand cart store with LocalStorage persistence

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, Topping, Variant } from "./menuData";

export type OrderType = "dine-in" | "takeout" | "delivery";

export interface CartItem {
  id: string; // unique per cart entry (itemId + toppings + variant + options combo)
  menuItem: MenuItem;
  quantity: number;
  selectedToppings: Topping[];
  selectedVariant?: Variant;
  selectedSweetness?: string;
  selectedServingStyle?: string;
  selectedDrinkTemp?: string;
  subtotal: number;
}

interface CartStore {
  items: CartItem[];
  orderType: OrderType;
  pickupTime: string;
  customerNote: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;

  addItem: (
    item: MenuItem,
    toppings: Topping[],
    qty: number,
    variant?: Variant,
    sweetness?: string,
    servingStyle?: string,
    drinkTemp?: string
  ) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, qty: number) => void;
  setOrderType: (type: OrderType) => void;
  setPickupTime: (time: string) => void;
  setCustomerNote: (note: string) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setDeliveryAddress: (address: string) => void;
  clearCart: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

function buildCartId(
  itemId: string,
  toppingIds: string[],
  variantId?: string,
  sweetness?: string,
  servingStyle?: string,
  drinkTemp?: string
): string {
  return `${itemId}__${toppingIds.sort().join("-")}__${variantId || "none"}__${sweetness || "none"}__${servingStyle || "none"}__${drinkTemp || "none"}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: "takeout",
      pickupTime: "",
      customerNote: "",
      customerName: "",
      customerPhone: "",
      deliveryAddress: "",

      addItem: (menuItem, selectedToppings, quantity, selectedVariant, sweetness, servingStyle, drinkTemp) => {
        const cartId = buildCartId(
          menuItem.id,
          selectedToppings.map((t) => t.id),
          selectedVariant?.id,
          sweetness,
          servingStyle,
          drinkTemp
        );
        const toppingTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
        const basePrice = selectedVariant ? selectedVariant.price : menuItem.price;
        const unitPrice = basePrice + toppingTotal;
        const subtotal = unitPrice * quantity;

        set((state) => {
          const existing = state.items.find((i) => i.id === cartId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === cartId
                  ? {
                      ...i,
                      quantity: i.quantity + quantity,
                      subtotal: (i.quantity + quantity) * unitPrice,
                    }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: cartId,
                menuItem,
                quantity,
                selectedToppings,
                selectedVariant,
                selectedSweetness: sweetness,
                selectedServingStyle: servingStyle,
                selectedDrinkTemp: drinkTemp,
                subtotal,
              },
            ],
          };
        });
      },

      removeItem: (cartId) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== cartId) })),

      updateQuantity: (cartId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== cartId)
              : state.items.map((i) => {
                  if (i.id !== cartId) return i;
                  const toppingTotal = i.selectedToppings.reduce((s, t) => s + t.price, 0);
                  const basePrice = i.selectedVariant ? i.selectedVariant.price : i.menuItem.price;
                  const unitPrice = basePrice + toppingTotal;
                  return { ...i, quantity: qty, subtotal: unitPrice * qty };
                }),
        })),

      setOrderType: (orderType) => set({ orderType }),
      setPickupTime: (pickupTime) => set({ pickupTime }),
      setCustomerNote: (customerNote) => set({ customerNote }),
      setCustomerName: (customerName) => set({ customerName }),
      setCustomerPhone: (customerPhone) => set({ customerPhone }),
      setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
      clearCart: () =>
        set({
          items: [],
          orderType: "takeout",
          pickupTime: "",
          customerNote: "",
          customerName: "",
          customerPhone: "",
          deliveryAddress: "",
        }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.subtotal, 0),
    }),
    { name: "aryunoi-cart" }
  )
);
