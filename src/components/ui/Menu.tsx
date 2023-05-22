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

export const Menu: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: isAdmin } = api.admin.userIsAdmin.useQuery({
    id: sessionData ? sessionData.user.id : null,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2 outline-none">
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
      <DropdownMenuContent className="mr-8 w-44">
        {isAdmin ? (
          <AdminActions />
        ) : (
          <CustomerActions sessionData={sessionData} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AdminActions = () => (
  <>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <NextLink
        href="/admin/"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
      >
        Dashboard
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <NextLink
        href="/admin/orders"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
      >
        Orders
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem>
      {" "}
      <NextLink
        href="/admin/products"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
      >
        Products
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem>
      {" "}
      <NextLink
        href="/admin/users"
        className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
      >
        Users
      </NextLink>
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => signOut()}
      className="cursor-pointer font-medium"
    >
      Sign Out
    </DropdownMenuItem>
  </>
);

const CustomerActions = ({ sessionData }: { sessionData: Session | null }) => (
  <>
    {sessionData ? (
      <>
        <DropdownMenuItem>
          <NextLink
            href="/products"
            className="-m-2 block w-full px-2  py-3 font-medium text-gray-900"
          >
            Products
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            href="/orders"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
          >
            My Orders
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="w-full cursor-pointer font-medium"
        >
          Sign Out
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem>
          <NextLink
            href="/auth/signin"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
          >
            Sign In
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            href="/auth/signup"
            className="-m-2 block  w-full px-2 py-3 font-medium text-gray-900"
          >
            Create Account
          </NextLink>
        </DropdownMenuItem>
      </>
    )}
  </>
);
