import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import type { Session } from "next-auth";
import Image from "next/image";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cartStore";

export const Menu: React.FC = () => {
  const clearCart = useCartStore((state) => state.removeAll);
  const { data: sessionData } = useSession();
  const { data: isAdmin } = api.admin.userIsAdmin.useQuery({
    id: sessionData ? sessionData.user.id : null,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" type="button">
        {sessionData?.user.image ? (
          <Image
            className="rounded-full object-contain"
            src={`${sessionData.user.image}`}
            width={32}
            height={32}
            alt="Profile avatar image"
          />
        ) : (
          <UserCircleIcon
            className="h-8 w-8  text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-44 border-slate-800 bg-slate-900 text-gray-400">
        {isAdmin ? (
          <AdminActions clearCart={clearCart} />
        ) : (
          <CustomerActions sessionData={sessionData} clearCart={clearCart} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AdminActions = ({ clearCart }: { clearCart: () => void }) => (
  <>
    <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-gray-600" />
    <DropdownMenuItem className="focus:bg-slate-800">
      <NextLink
        href="/admin"
        className="-m-2 block  w-full  px-2 py-3 font-medium text-gray-400"
      >
        Dashboard
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem className="focus:bg-slate-800">
      <NextLink
        href="/admin/orders"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400"
      >
        Orders
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem className="focus:bg-slate-800">
      {" "}
      <NextLink
        href="/admin/products"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400"
      >
        Products
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem className="focus:bg-slate-800">
      {" "}
      <NextLink
        href="/admin/users"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400"
      >
        Users
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => {
        clearCart();
        signOut();
      }}
      className="cursor-pointer font-medium focus:bg-slate-800 focus:text-gray-400"
    >
      Sign Out
    </DropdownMenuItem>
  </>
);

const CustomerActions = ({
  sessionData,
  clearCart,
}: {
  sessionData: Session | null;
  clearCart: () => void;
}) => (
  <>
    {sessionData ? (
      <>
        <DropdownMenuItem className="focus:bg-slate-800">
          <NextLink
            href="/products"
            className="-m-2 block w-full px-2  py-3 font-medium text-gray-400"
          >
            Products
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-slate-800">
          <NextLink
            href="/orders"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400"
          >
            My Orders
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={() => {
            clearCart();
            signOut();
          }}
          className="w-full cursor-pointer font-medium focus:bg-slate-800 focus:text-gray-400"
        >
          Sign Out
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem className="focus:bg-slate-800">
          <NextLink
            href="/auth/signin"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400"
          >
            Sign In
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-slate-800">
          <NextLink
            href="/auth/signup"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-400 "
          >
            Create Account
          </NextLink>
        </DropdownMenuItem>
      </>
    )}
  </>
);
