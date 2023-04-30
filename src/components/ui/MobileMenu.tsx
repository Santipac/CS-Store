import React, { Fragment } from "react";
import NextLink from "next/link";
import { Transition, Dialog } from "@headlessui/react";
import { navigation } from "@/constants/navbar";
import { signOut } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Session } from "next-auth";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sessionData: Session | null;
  isAdmin: boolean;
}

export const MobileMenu: React.FC<Props> = ({
  open,
  setOpen,
  sessionData,
  isAdmin,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex ">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {isAdmin && (
                <div className="mt-4">
                  <h2 className="pl-4 text-sm font-semibold text-gray-500">
                    Admin Actions
                  </h2>
                  <div className=" space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <NextLink
                        href="/admin/"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Dashboard
                      </NextLink>
                    </div>
                    <div className="flow-root">
                      <NextLink
                        href="/admin/orders"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Orders
                      </NextLink>
                    </div>
                    <div className="flow-root">
                      <NextLink
                        href="/admin/products"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Products
                      </NextLink>
                    </div>
                    <div className="flow-root">
                      <NextLink
                        href="/admin/users"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Users
                      </NextLink>
                    </div>
                  </div>
                </div>
              )}

              {!isAdmin && (
                <div className="mt-4">
                  <h2 className="pl-4 text-sm font-semibold text-gray-500">
                    Actions
                  </h2>
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <NextLink
                        href="/products"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Products
                      </NextLink>
                    </div>
                    <div className="flow-root">
                      <NextLink
                        href="/cart"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Cart
                      </NextLink>
                    </div>
                    {sessionData && (
                      <>
                        <div className="flow-root">
                          <NextLink
                            href="/orders"
                            className="-m-2 block p-2 font-medium text-gray-900"
                          >
                            My Orders
                          </NextLink>
                        </div>
                        <div className="flow-root">
                          <NextLink
                            href="/account"
                            className="-m-2 block p-2 font-medium text-gray-900"
                          >
                            Account
                          </NextLink>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-1">
                <h2 className="pl-4 text-sm font-semibold text-gray-500">
                  Pages
                </h2>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              {sessionData ? (
                <div className="mt-4 space-y-6 border-y border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <button
                      className="-m-2 flex items-center p-2 font-medium text-gray-900"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-6 border-y border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <NextLink
                      href="/auth/signin"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </NextLink>
                  </div>
                  <div className="flow-root">
                    <NextLink
                      href="/auth/signup"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </NextLink>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
