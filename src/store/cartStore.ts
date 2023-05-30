import type { ProductCart } from "@/interfaces/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  items: ProductCart[];
  total: number;
  count: number;
  isEmpty: boolean;
};
type Actions = {
  AddProduct: (product: ProductCart) => void;
  increase: (productID: string) => void;
  decrease: (productID: string) => void;
  remove: (productID: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartState & Actions>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      count: 0,
      isEmpty: true,
      AddProduct: (product: ProductCart) =>
        set((state) => {
          const wasAdded = state.items.some((item) => item.id === product.id);
          let newItems = [];

          if (wasAdded) {
            newItems = state.items.map((item) =>
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
          } else {
            newItems = [...state.items, product];
          }

          const total = newItems.reduce((total, product) => {
            return total + product.price * product.quantity;
          }, 0);

          const count = newItems.reduce((count, product) => {
            return count + product.quantity;
          }, 0);

          const isEmpty = newItems.length === 0 ? true : false;

          return {
            ...state,
            items: newItems,
            total,
            count,
            isEmpty,
          };
        }),
      increase: (id: string) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id !== id) return item;
            if (item.quantity === item.inStock) return item;
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          });
          const total = newItems.reduce((total, product) => {
            return total + product.price * product.quantity;
          }, 0);
          const count = newItems.reduce((count, product) => {
            return count + product.quantity;
          }, 0);
          const isEmpty = newItems.length === 0 ? true : false;
          return { ...state, items: newItems, total, count, isEmpty };
        }),
      decrease: (id: string) =>
        set((state) => {
          const newItems = state.items
            .map((item) => {
              if (item.id !== id) return item;
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0);
          const total = newItems.reduce((total, product) => {
            return total + product.price * product.quantity;
          }, 0);
          const count = newItems.reduce((count, product) => {
            return count + product.quantity;
          }, 0);
          const isEmpty = newItems.length === 0 ? true : false;
          return { ...state, items: newItems, total, count, isEmpty };
        }),
      remove: (id: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const total = newItems.reduce((total, product) => {
            return total + product.price * product.quantity;
          }, 0);
          const count = newItems.reduce((count, product) => {
            return count + product.quantity;
          }, 0);
          const isEmpty = newItems.length === 0 ? true : false;
          return { ...state, items: newItems, total, count, isEmpty };
        }),

      removeAll: () =>
        set((state) => ({
          ...state,
          items: [],
          total: 0,
          isEmpty: true,
          count: 0,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
