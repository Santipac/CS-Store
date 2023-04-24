import React from "react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { VscAccount } from "react-icons/vsc";
import Image from "next/image";
export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex w-full items-center justify-around px-4 py-6">
      <NextLink href="/" className="font-semibold text-gray-900">
        CS Store
      </NextLink>
      <NextLink href="/products" className="text-gray-600">
        Products
      </NextLink>
      <div className="dropdown-end dropdown">
        <label tabIndex={0}>
          <div className="w-10 cursor-pointer rounded-full">
            {sessionData?.user ? (
              <Image
                className="rounded-full"
                src={`${sessionData?.user.image || ""}`}
                width={30}
                height={30}
                alt="Profile avatar image"
              />
            ) : (
              <VscAccount size="30px" />
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-slate-100 p-2 text-gray-600 shadow"
        >
          <li>
            <a>Orders</a>
          </li>
          <li>
            <a>Sell Skins</a>
          </li>
          <li>
            <a>Account</a>
          </li>
          <li
            className="text-center"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            <a>{sessionData ? "Sign out" : "Sign in"}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
