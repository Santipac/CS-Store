import type { Product } from "@prisma/client";
import { create } from "zustand";

type CartState = {
  items: Product[];
  computed: {
    get isEmpty(): boolean;
    get total(): number;
  };
  AddProduct: (product: Product) => void;
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
        return total + product.price * 1;
      }, 0);
    },
  },
  AddProduct: (product: Product) =>
    set((state) => {
      const wasAdded = state.items.some((item) => item.id === product.id);
      if (!wasAdded) {
        return { ...state, items: [product, ...state.items] };
      }
      return state;
    }),
  remove: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  removeAll: () => set((state) => ({ ...state, items: [] })),
}));
