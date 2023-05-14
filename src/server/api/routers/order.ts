import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { orderSchema } from "@/common/validation/order";

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(orderSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) return false;

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
});
