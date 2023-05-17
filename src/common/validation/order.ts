import { z } from "zod";
export const orderItemSchema = z.object({
  productId: z.string(),
  name: z.string().nonempty("This field is required"),
  image: z.string().nonempty("This field is required"),
  slug: z.string().nonempty("This field is required"),
  quantity: z.number(),
  tradelock: z.string().nonempty("This field is required"),
  description: z.string().optional().nullable(),
  float: z.number().optional().nullable(),
  price: z.number(),
  inStock: z.number(),
  type: z.string(),
  wear: z.string().optional().nullable(),
  statTrak: z.boolean().optional().nullable(),
});

export const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  total: z.number(),
  numberOfItems: z.number(),
});
