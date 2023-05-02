import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../ui/helpers";
import { signOut } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";
import type { Session } from "next-auth";
import { useRouter } from "next/router";

const userNavigation = [{ name: "Home", href: "/" }];

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
    { name: "Dashboard", href: "/admin/", current: pathname === "/admin/" },
    {
      name: "Products",
      href: "/admin/products",
      current: pathname === "/admin/products",
    },
    {
      name: "Users",
      href: "/admin/users",
      current: pathname === "/admin/users",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      current: pathname === "/admin/orders",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-white">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <NextLink
                        href="/"
                        className="text-2xl font-bold text-gray-800"
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
                                : "text-gray-500  hover:text-gray-900",
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
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
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
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <NextLink
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Home
                              </NextLink>
                            </Menu.Item>

                            <Menu.Item>
                              <span
                                onClick={() => signOut()}
                                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Sign out
                              </span>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
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
                    {sessionData ? (
                      <div className="ml-3">
                        <div className="mb-2 text-base font-medium leading-none text-gray-600">
                          {sessionData.user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-600">
                          {sessionData.user.email}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2"></div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};
