import React from "react";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { VscAccount } from "react-icons/vsc";

export const Navbar: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between py-6">
      <NextLink href="/" className="font-semibold text-gray-900">
        CS Store
      </NextLink>
      <NextLink href="/products" className="text-gray-600">
        Products
      </NextLink>
      <div className="dropdown-end dropdown">
        <label tabIndex={0}>
          <div className="w-10 cursor-pointer rounded-full">
            <VscAccount size="30px" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-slate-100 p-2 text-gray-600 shadow"
        >
          <li className="text-center" onClick={() => signIn()}>
            <a>Sign in</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
