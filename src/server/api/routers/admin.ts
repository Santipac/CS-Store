import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserRole } from "@prisma/client";

export const adminRouter = createTRPCRouter({
  userIsAdmin: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({ where: { id } });
      if (!user) return false;
      if (user.role === UserRole.ADMIN) return true;
      return false;
    }),
});
