import { useCartStore } from "@/store/cartStore";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export const CartPopover: React.FC = () => {
  const { items, remove } = useCartStore();
  return (
    <div className="dropdown-end dropdown hidden min-[500px]:block">
      <label tabIndex={0} className="m-1">
        <a href="#" className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {items.length}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </a>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content w-96  rounded-sm  bg-white  px-2 py-4 shadow"
      >
        {items.length === 0 ? (
          <li className=" text-center">
            <h2 className="text-md font-medium text-gray-500">Cart Empty</h2>
          </li>
        ) : (
          <>
            {items.map((item) => (
              <li key={item.id} className="  border-b border-gray-200 p-1">
                <div className="flex">
                  <Image
                    src={item.image}
                    alt="Image Product for Cart"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                  <div className="flex h-full w-full flex-col space-y-2 px-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-700">
                        {item.name}
                      </h2>
                      <h2 className="text-sm font-medium text-gray-700">
                        ${item.price.toLocaleString()}
                      </h2>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-regular text-xs text-gray-500">
                        Qty: 1
                      </p>
                      <span
                        className="font-regular cursor-pointer text-xs text-red-500 hover:text-red-700"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <button className="btn-block btn mt-2 rounded-sm bg-zinc-700 text-white">
              Go to Cart
            </button>
          </>
        )}
      </ul>
    </div>
  );
};
