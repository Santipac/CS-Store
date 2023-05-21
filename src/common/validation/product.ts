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
export const productFormValidation = z.object({
  name: z.string().nonempty("This field is required"),
  tradelock: z.string().nonempty("This field is required"),
  description: z.string().optional(),
  float: z.string().optional(),
  price: z.string().nonempty("This field is required"),
  inStock: z.string().nonempty("This field is required"),
  type: z.union([
    z.literal("KNIFE"),
    z.literal("GLOVES"),
    z.literal("FUSIL"),
    z.literal("SNIPER"),
    z.literal("SMG"),
    z.literal("SHOTGUN"),
    z.literal("PISTOL"),
    z.literal("STICKER"),
    z.literal("AGENT"),
    z.literal("PIN"),
    z.literal("KIT"),
  ]),
  wear: z.string().optional(),
  statTrak: z.string().optional(),
});

export const getProductsFilterSchema = z
  .union([
    z.literal("CHEAP_FIRST"),
    z.literal("EXPENSIVE_FIRST"),
    z.literal("NEWEST"),
    z.literal("OLDEST"),
  ])
  .default("NEWEST");

export type IProduct = z.infer<typeof productSchema>;
