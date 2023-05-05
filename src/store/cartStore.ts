import type { Product } from "@prisma/client";
import { create } from "zustand";

interface ProductCart extends Product {
  quantity: number;
}

//TODO: Decrement and Increment Quantity

type CartState = {
  items: ProductCart[];
  computed: {
    get isEmpty(): boolean;
    get total(): number;
  };
  AddProduct: (product: ProductCart) => void;
  increase: (productID: string) => void;
  decrease: (productID: string) => void;
  remove: (productID: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  computed: {
    get isEmpty() {
      return get().items.length === 0;
    },
    get total() {
      return get().items.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  },
  AddProduct: (product: ProductCart) =>
    set((state) => {
      const wasAdded = state.items.some((item) => item.id === product.id);
      if (!wasAdded) {
        return { ...state, items: [product, ...state.items] };
      }
      return state;
    }),
  increase: (id: string) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== id) return item;
        if (item.quantity === item.inStock) return item;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    })),
  decrease: (id: string) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id !== id) return item;
        if (item.quantity === 1) return item;
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }),
    })),
  remove: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  removeAll: () => set((state) => ({ ...state, items: [] })),
}));
