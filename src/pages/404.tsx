import React from "react";
import NextLink from "next/link";
const ErrorPage = () => {
  return (
    <div className="grid h-screen place-content-center bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-300">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-500 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>

        <NextLink
          href="/"
          className="mt-6 inline-block rounded bg-sky-500 px-5 py-3 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring"
        >
          Go Back Home
        </NextLink>
      </div>
    </div>
  );
};

export default ErrorPage;
