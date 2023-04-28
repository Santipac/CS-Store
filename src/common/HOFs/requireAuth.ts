import { getServerAuthSession } from "@/server/auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const requireAuth =
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

    return await func(ctx);
  };
