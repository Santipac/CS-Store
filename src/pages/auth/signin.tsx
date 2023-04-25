import React, { useCallback } from "react";
import { getSession, signIn } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

const emailSchema = z
  .object({ email: z.string().trim().email("It's not a valid mail!") })
  .strict();

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });
  const signInWithGoogle = useCallback(async () => {
    await signIn("google");
  }, []);
  const signInWithFacebook = useCallback(async () => {
    await signIn("facebook");
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
        <form
          className="space-y-4"
          onSubmit={handleSubmit((d) => console.log(d))}
        >
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
              {errors["email"] ? (
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <span className="text-xs font-semibold text-error">
                      {message}
                    </span>
                  )}
                />
              ) : (
                <span className="text-label text-xs">
                  We&apos;ll send you magic link
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn-block btn border-none bg-arg text-white shadow-md hover:bg-[#67adce]"
          >
            Sign in
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
        <button
          className="btn-block btn border-none bg-blue-500 text-white hover:bg-slate-200 "
          onClick={signInWithFacebook}
        >
          <IoLogoFacebook className="mr-2" size="24px" />
          Sign in With Facebook
        </button>
        {/* <NextLink
          className="link text-end font-normal text-gray-400"
          href="/auth/signup"
        >
          Don&apos;t have an account ?
        </NextLink> */}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { page = "/" } = query;

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
