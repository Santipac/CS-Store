import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const requireBeAdmin =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return {
        redirect: {
          destination: "/auth/signup",
          permanent: false,
        },
      };
    }
    if (user.role !== "admin") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return await func(ctx);
  };
