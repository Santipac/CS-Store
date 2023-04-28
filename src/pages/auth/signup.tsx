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

const RegisterPage = () => {
  const router = useRouter();
  const { mutateAsync: createUser } = api.users.createUser.useMutation();
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
      if (result.status === 201) {
        router.push("/auth/login");
      }
    },
    [createUser, router]
  );
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
                Full Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className="input-bordered input w-full"
              {...register("name")}
            />
            <div className="mt-1">
              {errors["name"] && (
                <ErrorMessage
                  errors={errors}
                  name="name"
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
            Sign up
          </button>
        </form>
        <hr />

        <NextLink
          className="link text-end font-normal text-gray-400"
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
