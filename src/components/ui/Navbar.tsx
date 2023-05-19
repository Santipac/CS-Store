import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { navigation } from "@/constants/navbar";
import Image from "next/image";
import NextLink from "next/link";
import { classNames } from "./helpers";
import { CartPopover } from "./CartPopover";
import { useCartStore } from "@/store/cartStore";
import { shallow } from "zustand/shallow";
import { Menu } from "./Menu";

export const Navbar: React.FC = () => {
  const { count } = useCartStore((state) => state.computed, shallow);

  return (
    <div className="w-full bg-white">
      <header className="relative z-50 bg-white">
        <p className="flex h-10 items-center justify-center bg-zinc-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get the best CSGO skins at the best price
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl">
          <div className="flex h-16 w-full items-center justify-between">
            {/* Logo */}
            <div className="ml-4 flex flex-1 lg:ml-0">
              <NextLink href="/" className="text-2xl font-bold text-gray-800">
                CS
              </NextLink>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden flex-1 lg:ml-8 lg:block lg:self-stretch ">
              <div className="flex h-full  space-x-8">
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
                                        <p aria-hidden="true" className="mt-1">
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
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              {/* Cart */}
              <div className="mx-6 ">
                <NextLink href="/cart" className="sm:hidden">
                  <span className="relative flex items-center justify-center">
                    <ShoppingBagIcon
                      className="z-20 mt-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="absolute -right-3 top-0 z-20 rounded-full bg-zinc-700 px-1 text-xs font-medium text-white">
                      {count}
                    </span>
                  </span>
                </NextLink>
                <div className="hidden sm:block">
                  <CartPopover />
                </div>
              </div>
              <Menu />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

/*
 */
