import { z } from "zod";
export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  total: z.number(),
  numberOfItems: z.number(),
});
