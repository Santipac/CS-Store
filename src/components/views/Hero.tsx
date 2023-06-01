import React from "react";
// import {
//   BoltIcon,
//   CreditCardIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/outline";
// import image1 from "../../../public/heroimage.jpg";
// import image2 from "../../../public/heroimage-2.jpg";
// import image3 from "../../../public/heroimage-3.jpg";
// import NextLink from "next/link";
import { Button } from "../ui/primitives";
import { useRouter } from "next/router";
export const Hero = () => {
  const router = useRouter();
  return (
    <section className="min-h-[70vh] w-full items-center bg-inherit pb-8 ">
      <article className="flex h-full max-w-7xl flex-col items-center justify-center gap-8 md:px-4">
        <div>
          <h2 className="text-center text-4xl font-extrabold tracking-tighter text-gray-100 min-[425px]:text-5xl min-[520px]:text-6xl sm:text-7xl lg:text-8xl">
            BEST
            <span className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500  bg-clip-text px-4 text-transparent">
              STORE
            </span>
            FOR
          </h2>
          <h2 className="text-center text-4xl font-extrabold tracking-tighter text-gray-100 min-[425px]:text-5xl min-[520px]:text-6xl sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text pr-4 text-transparent">
              CSGO
            </span>
            SKINS
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => router.push("/products")}
          >
            Find Products
          </Button>
          <Button size="lg">Sell Skins</Button>
        </div>
      </article>
      {/* <div className="grid min-h-[60vh] w-full grid-cols-11 grid-rows-6 gap-2 bg-slate-50">
        <NextLink
          href="/products/categories/FUSIL"
          className="col-start-1 col-end-12 row-start-1 row-end-3 hover:opacity-90 md:col-end-7 md:row-end-7"
        >
          <div
            className="relative h-full w-full rounded-md bg-blue-300"
            style={{
              backgroundImage: `url(${image1.src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="h-full w-full rounded-md bg-black opacity-60" />
            <div className="absolute bottom-0 left-0 mb-2 ml-4 h-16 w-full">
              <h2 className="text-xl font-medium text-white">Assault Rifles</h2>
              <p className="text-sm font-medium text-white">Shop now</p>
            </div>
          </div>
        </NextLink>
        <NextLink
          href="/products/categories/KNIFE"
          className="col-start-1 col-end-12 row-start-3 row-end-5 hover:opacity-90 md:col-start-7 md:row-start-1 md:row-end-4"
        >
          <div
            className="relative h-full w-full rounded-md bg-blue-300"
            style={{
              backgroundImage: `url(${image2.src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
            }}
          >
            <div className="h-full w-full rounded-md bg-black opacity-60" />
            <div className="absolute bottom-0 left-0 mb-2 ml-4 h-16 w-full">
              <h2 className="text-xl font-medium text-white">Knifes</h2>
              <p className="text-sm font-medium text-white">Shop now</p>
            </div>
          </div>
        </NextLink>
        <NextLink
          href="/products/categories/AGENT"
          className="col-start-1 col-end-12 row-start-5 row-end-7 hover:opacity-90 md:col-start-7 md:row-start-4"
        >
          <div
            className="relative h-full w-full rounded-md bg-blue-300"
            style={{
              backgroundImage: `url(${image3.src})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          >
            <div className="h-full w-full rounded-md bg-black opacity-60" />
            <div className="absolute bottom-0 left-0 mb-2 ml-4 h-16 w-full">
              <h2 className="text-xl font-medium text-white">Agents</h2>
              <p className="text-sm font-medium text-white">Shop now</p>
            </div>
          </div>
        </NextLink>
      </div>
      <div>
        <div className="w-full  pt-6 lg:px-0">
          <div className="grid grid-cols-1  gap-6 space-y-0 lg:grid-cols-3 lg:gap-24">
            <div>
              <div>
                <p className="mt-5 flex items-center gap-2 text-lg font-semibold leading-6 text-black">
                  <CreditCardIcon className="h-6 w-6" /> Secure purchase
                </p>
              </div>
              <div className="mt-2  text-sm text-gray-600 sm:text-lg">
                We provide a third party service such as Stripe for the
                protection of your credentials.
              </div>
            </div>
            <div>
              <div>
                <p className="mt-5 flex items-center gap-2 text-lg font-semibold leading-6 text-black">
                  <BoltIcon className="h-6 w-6" /> Flash Delivery
                </p>
              </div>
              <div className="mt-2  text-sm text-gray-600 sm:text-lg">
                We deliver every day, so you will receive your purchases
                quickly.
              </div>
            </div>
            <div>
              <div>
                <p className="mt-5 flex items-center gap-2 text-lg font-semibold leading-6 text-black">
                  <CurrencyDollarIcon className="h-6 w-6" /> Sell us your skins
                </p>
              </div>
              <div className="mt-2  text-sm text-gray-600 sm:text-lg">
                We buy and quote your skins at the best price in the market!
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};
