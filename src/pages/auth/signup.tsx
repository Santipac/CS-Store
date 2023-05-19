/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback } from "react";
import NextLink from "next/link";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type ISignUp, signUpSchema } from "@/common/validation/auth";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@/components";
import { Button } from "@/components/ui/primitives/button";
import { Label } from "@/components/ui/primitives/label";
import { Input } from "@/components/ui/primitives/input";

const RegisterPage = () => {
  const router = useRouter();
  const { mutateAsync: createUser, isLoading } =
    api.users.createUser.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await createUser(data);
      if (result.status === 409) {
        toast.error(result.message);
      }
      toast.success(result.message);
      const timeoutId = setTimeout(() => router.push("/auth/signin"), 1000);
      return () => clearTimeout(timeoutId);
    },
    [createUser, router]
  );
  return (
    <div
      className="grid h-screen place-content-center bg-slate-200"
      data-theme="light"
    >
      <Toaster />
      <div className="flex min-h-min w-96 flex-col space-y-8 rounded-lg bg-white px-4 py-6 shadow-lg">
        <h2 className="text-center text-xl font-semibold text-zinc-800">
          CS Store
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input type="name" {...register("name")} />
            <div className="mt-1">
              {errors["name"] && (
                <ErrorMessage
                  errors={errors}
                  name="name"
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
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input type="email" {...register("email")} />
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
              "Sign up"
            )}
          </Button>
        </form>
        <NextLink
          className="text-end text-sm font-normal text-gray-600 underline"
          href="/auth/signin"
        >
          Have an account ?
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

export default RegisterPage;
