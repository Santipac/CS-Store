import { createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { usersRouter } from "./routers/user";
import { productRouter } from "./routers/product";
import { orderRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  order: orderRouter,
  admin: adminRouter,
  users: usersRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
