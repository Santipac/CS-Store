import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../ui/helpers";
import type { Session } from "next-auth";

// const userNavigation = [{ name: "Home", href: "/" }];
interface Props {
  children: JSX.Element | JSX.Element[];
  sessionData: Session | null;
  title: string;
}

export const AdminLayout: React.FC<Props> = ({
  children,
  sessionData,
  title,
}) => {
  const { pathname } = useRouter();
  const navigation = [
    {
      name: "Products",
      href: "/admin/products",
      current: pathname === "/admin/products",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      current: pathname === "/admin/orders",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-slate-950">
        <Disclosure as="nav" className="bg-slate-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <NextLink
                        href="/"
                        className="text-2xl font-bold text-gray-200"
                      >
                        CS
                      </NextLink>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NextLink
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-500  hover:text-blue-400",
                              "rounded-md px-3 py-2 text-sm font-medium "
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </NextLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
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
                        <DropdownMenuContent className="mr-8 bg-slate-900">
                          <DropdownMenuItem>
                            <NextLink
                              href="/"
                              className="-m-2 block p-2 font-medium text-gray-300"
                            >
                              Home
                            </NextLink>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => signOut()}
                            className="cursor-pointer text-red-800"
                          >
                            Sign Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-gray-400   focus:outline-none focus:ring-2 focus:ring-white ">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:text-gray-800",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Disclosure.Button
                    className="block rounded-md px-3 py-2 text-base font-medium text-red-800"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Disclosure.Button>
                </div>
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {sessionData ? (
                        <>
                          {sessionData.user.image ? (
                            <Image
                              src={sessionData.user.image}
                              alt="Avatar image for admin user"
                              className="rounded-full  object-cover"
                              width={32}
                              height={32}
                            />
                          ) : (
                            <UserCircleIcon
                              className="h-8 w-8  text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </>
                      ) : (
                        <UserCircleIcon
                          className="h-8 w-8  text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {sessionData && (
                      <div className="ml-3">
                        <div className="mb-2 text-base font-medium leading-none text-gray-600">
                          {sessionData.user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-600">
                          {sessionData.user.email}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-slate-950 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-200">
              {title}
            </h1>
          </div>
        </header>
        <main className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
