import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { orderSchema } from "@/common/validation/order";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(orderSchema)
    .mutation(async ({ input, ctx }) => {
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
          const product = productsDB.find((p) => p.id === orderItem.productId);

          if (product && orderItem.quantity <= product.inStock) {
            return (orderItem = {
              ...orderItem,
              image: product.image,
            });
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
      const newOrder = await ctx.prisma.order.create({
        data: {
          user: {
            connect: { id: userId },
          },
          total: input.total,
          numberOfItems: input.numberOfItems,
          orderItems: {
            createMany: { data: input.orderItems },
          },
        },
        select: {
          id: true,
          isPaid: true,
          numberOfItems: true,
          orderItems: true,
          total: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      return newOrder;
    }),
  getOrderByUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const orders = await ctx.prisma.order.findMany({
        where: { userId: input.id },
        orderBy: { createdAt: "desc" },
      });
      return orders;
    }),
  getAllOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  }),
});
