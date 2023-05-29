import type { ProductCart } from "@/interfaces/product";
import { create } from "zustand";
type CartState = {
  items: ProductCart[];
  computed: {
    get isEmpty(): boolean;
    get total(): number;
    get count(): number;
  };
};
type Actions = {
  AddProduct: (product: ProductCart) => void;
  increase: (productID: string) => void;
  decrease: (productID: string) => void;
  remove: (productID: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartState & Actions>((set, get) => ({
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
    get count() {
      return get().items.reduce((count, product) => {
        return count + product.quantity;
      }, 0);
    },
  },
  AddProduct: (product: ProductCart) =>
    set((state) => {
      const wasAdded = state.items.some((item) => item.id === product.id);
      if (wasAdded) {
        const updateQuantityProduct = state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + product.quantity <= product.inStock
                    ? item.quantity + product.quantity
                    : product.inStock,
              }
            : item
        );
        return { ...state, items: updateQuantityProduct };
      }
      if (!wasAdded) {
        return { ...state, items: [...state.items, product] };
      }
      return state;
    }),
  increase: (id: string) =>
    set({
      items: get().items.map((item) => {
        if (item.id !== id) return item;
        if (item.quantity === item.inStock) return item;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    }),
  decrease: (id: string) =>
    set({
      items: get()
        .items.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0),
    }),
  remove: (id: string) =>
    set({
      items: get().items.filter((item) => item.id !== id),
    }),
  removeAll: () => set((state) => ({ ...state, items: [] })),
}));
