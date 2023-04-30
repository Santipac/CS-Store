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
    await signIn("google");
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Email <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input-bordered input w-full"
              {...register("email")}
            />
            <div className="mt-1">
              {errors["email"] && (
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <span className="text-xs font-semibold text-error">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Password <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="password"
              className="input-bordered input w-full"
              {...register("password")}
            />
            <div className="mt-1">
              {errors["password"] && (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <span className="text-xs font-semibold text-error">
                      {message}
                    </span>
                  )}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn-block btn border-none bg-arg text-white shadow-md hover:bg-[#67adce]"
          >
            {isLoading ? (
              <Spinner
                width="w-8"
                height="h-8"
                colorText="text-arg"
                fill="fill-gray-200"
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <hr />
        <button
          className="btn-block btn border-none bg-slate-100 text-gray-500 hover:bg-slate-200 "
          onClick={signInWithGoogle}
        >
          <FcGoogle className="mr-2" size="24px" />
          Sign in With Google
        </button>
        <NextLink
          className="link text-end font-normal text-gray-400"
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
