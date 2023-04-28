import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  image: z.string(),
  tradelock: z.string(),
  description: z.string().optional(),
  float: z.number().optional(),
  price: z.number(),
  inStock: z.number(),
  type: z.string(),
  wear: z.string().optional(),
  statTrak: z.string().optional(),
});

export type IProduct = z.infer<typeof productSchema>;
