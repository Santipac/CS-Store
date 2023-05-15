import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import stripe from "@/lib/stripe";
import { z } from "zod";
import { orderItemSchema } from "@/common/validation/order";
import { env } from "@/env.mjs";

const orderSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string(),
  }),
  id: z.string(),
  orderItems: z.array(orderItemSchema),
  numberOfItems: z.number(),
  total: z.number(),
  isPaid: z.boolean(),
});

export const checkoutRouter = createTRPCRouter({
  checkoutSession: publicProcedure
    .input(orderSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.session?.user.id;
        if (!userId)
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "User is not authenticated",
          });

        const productsDB = await ctx.prisma.product.findMany({
          where: {
            id: {
              in: input.orderItems.map((item) => item.productId),
            },
          },
        });
        const orderItemsValidated = input.orderItems
          .map((orderItem) => {
            const product = productsDB.find(
              (p) => p.id === orderItem.productId
            );
            if (product && orderItem.quantity <= product.inStock) {
              return {
                ...product,
                quantity: orderItem.quantity,
              };
            } else {
              return null;
            }
          })
          .filter((orderItem) => orderItem !== null);

        if (orderItemsValidated.length !== input.orderItems.length) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Some products are not available",
          });
        }
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],

          mode: "payment",
          line_items: orderItemsValidated.map((product) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: product!.name,
              },
              unit_amount: product!.price * 100,
            },
            quantity: product!.quantity,
          })),
          success_url: `${env.APP_URL}/checkout/success/${input.id}`,
          cancel_url: `${env.APP_URL}/checkout/error/${input.id}`,
        });
        return {
          url: session.url ?? "",
          status: session.payment_status,
        };
      } catch (error) {
        let msg = "";
        if (error instanceof Error) {
          msg = error.message;
        }
        throw new TRPCError({
          message: msg || "Payment failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
