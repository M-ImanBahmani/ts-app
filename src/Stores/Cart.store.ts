import { create } from "zustand";
import type { ProductTypes } from "../Types/Product";

export type CartItemType = ProductTypes & { quantity: number };

type CartStore = {
  cartItems: CartItemType[];
  addToCart: (product: ProductTypes) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()((set) => ({
  cartItems: [],

  addToCart: (product) => {
    set((state) => {
      const exist = state.cartItems.find((item) => item.id === product.id);

      if (exist) {
        const updatedCart = state.cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        return { cartItems: updatedCart };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }
    });
  },

  decreaseQuantity: (productId) => {
    set((state) => {
      const exist = state.cartItems.find((item) => item.id === productId);

      if (!exist) return state;

      if (exist.quantity === 1) {
        const newCart = state.cartItems.filter((item) => item.id !== productId);
        return { cartItems: newCart };
      } else {
        const newCart = state.cartItems.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        return { cartItems: newCart };
      }
    });
  },
  clearCart: () => {
    set({ cartItems: [] });
  }
}));
