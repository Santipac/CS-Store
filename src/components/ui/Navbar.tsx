import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { navigation } from "@/constants/navbar";
import Image from "next/image";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { classNames } from "./helpers";
import { MobileMenu } from "./MobileMenu";
import { api } from "@/utils/api";
import { CartPopover } from "./CartPopover";
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { count } = useCartStore((state) => state.computed, shallow);
  const { data: sessionData } = useSession();
  const { data: isAdmin } = api.admin.userIsAdmin.useQuery({
    id: sessionData ? sessionData.user.id : null,
  });

  return (
    <div className="w-full bg-white">
      {/* Mobile menu */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        sessionData={sessionData}
        isAdmin={isAdmin === undefined ? false : isAdmin}
      />
      <header className="relative z-50 bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl">
          <div className="">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NextLink href="/" className="text-2xl font-bold text-gray-800">
                  CS
                </NextLink>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                              fill
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="mx-4 flow-root lg:ml-6">
                  <NextLink
                    href="/cart"
                    className="group -m-2 flex items-center p-2  min-[500px]:hidden"
                  >
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {count}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </NextLink>
                  <CartPopover />
                </div>
                {sessionData ? (
                  <>
                    <div className="dropdown-end dropdown hidden lg:block">
                      <label tabIndex={0} className="m-1 cursor-pointer">
                        {sessionData?.user.image ? (
                          <Image
                            className="rounded-full"
                            src={`${sessionData.user.image}`}
                            width={30}
                            height={30}
                            alt="Profile avatar image"
                          />
                        ) : (
                          <UserCircleIcon
                            className="h-8 w-8  text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        )}
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-white p-2 text-gray-600 shadow-md"
                      >
                        {!isAdmin && (
                          <>
                            <li>
                              <span>My Orders</span>
                            </li>
                            <li>
                              <span>Account</span>
                            </li>
                          </>
                        )}
                        {isAdmin && (
                          <>
                            <li>
                              <NextLink href="/">Dashboard</NextLink>
                            </li>
                            <li>
                              <NextLink href="/admin/products">
                                Products
                              </NextLink>
                            </li>
                            <li>
                              <NextLink href="/">Orders</NextLink>
                            </li>
                            <li>
                              <NextLink href="/">Users</NextLink>
                            </li>
                          </>
                        )}
                        <li>
                          <span onClick={() => signOut()}>Sign Out</span>
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      {sessionData?.user.image ? (
                        <Image
                          className="rounded-full"
                          src={`${sessionData.user.image}`}
                          width={30}
                          height={30}
                          alt="Profile avatar image"
                        />
                      ) : (
                        <UserCircleIcon
                          className="h-8 w-8  text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className="flex lg:hidden"
                      onClick={() => setOpen(!open)}
                    >
                      <UserCircleIcon
                        className="h-8 w-8  cursor-pointer text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <NextLink
                        href="/auth/signin"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign in
                      </NextLink>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <NextLink
                        href="/auth/signup"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create account
                      </NextLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

/*
 */
