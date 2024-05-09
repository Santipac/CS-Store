import React, { useCallback, useState } from "react";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";
import { type ILogin, loginSchema } from "@/common/validation/auth";
import { Spinner } from "@/components";
import { Label } from "@/components/ui/primitives/label";
import { Input } from "@/components/ui/primitives/input";
import { Button } from "@/components/ui/primitives/button";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    await signIn("google");
    setIsLoading(false);
  }, []);

  const onSubmit = useCallback(async (data: ILogin) => {
    setIsLoading(true);
    await signIn("credentials", data);
    setIsLoading(false);
  }, []);

  return (
    <div
      className="grid h-screen place-content-center bg-slate-200"
      data-theme="light"
    >
      <div className="flex min-h-min w-96 flex-col space-y-8 rounded-lg bg-white px-4 py-6 shadow-lg">
        <h2 className="text-center text-xl font-semibold text-zinc-800">
          CS Store
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />
            <div className="mt-1">
              {errors["email"] && (
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <span className="text-error text-xs font-semibold">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>
          <div className="form-control w-full space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input type="password" {...register("password")} />
            <div className="mt-1">
              {errors["password"] && (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <span className="text-error text-xs font-semibold">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>
          <Button type="submit" className="w-full bg-black">
            {isLoading ? (
              <Spinner
                width="w-8"
                height="h-8"
                colorText="text-arg"
                fill="fill-gray-200"
              />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
        <hr />
        <Button
          className="bg-slate-100 text-gray-500 hover:bg-slate-200 "
          onClick={signInWithGoogle}
        >
          <FcGoogle className="mr-2" size="24px" />
          Sign in With Google
        </Button>
        <NextLink
          className="text-end text-sm font-normal text-gray-600 underline"
          href="/auth/signup"
        >
          Don&apos;t have an account ?
        </NextLink>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const { page = "/" } = ctx.query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignIn;
