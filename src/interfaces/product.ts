import type { Product } from "@prisma/client";

export interface ProductCart extends Product {
  quantity: number;
}
