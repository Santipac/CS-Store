import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import React from "react";

export const Hero = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  return (
    <section className="w-full items-center bg-white pb-8 lg:h-screen">
      <div className="container mx-auto flex max-w-7xl flex-col items-start overflow-hidden bg-gray-100 px-8 pb-20 pt-24 md:flex-row lg:items-center lg:px-16">
        <div className="mb-8 flex flex-col text-center md:text-left lg:w-1/2 lg:flex-grow">
          <div className="max-w-xl text-center lg:text-left">
            <div>
              <p className="text-2xl font-medium tracking-tight text-black sm:text-4xl">
                {sessionData ? (
                  <span>Logged in as {sessionData.user?.name}</span>
                ) : (
                  <span>Some title</span>
                )}
              </p>
              <p className="mt-4 max-w-xl text-base tracking-tight text-gray-600">
                {secretMessage ? (
                  <span> - {secretMessage}</span>
                ) : (
                  <span>
                    We all make mistakes, have struggles, and even regret things
                    in our past. But you are not your mistakes, you are not your
                    struggles, and you are here NOW with the power to shape your
                    day and your future
                  </span>
                )}
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-start">
              <a
                className="nline-flex w-full items-center justify-center rounded-full border-2 border-black bg-black px-6 py-2.5 text-center text-sm text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
                href="#"
              >
                Primary button
              </a>
              <a
                className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900"
                href="#"
              >
                <span> Naked button </span>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-3 h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto px-5 pt-6 lg:max-w-6xl lg:px-0">
          <dl className="grid grid-cols-1 gap-6 space-y-0 lg:grid-cols-3 lg:gap-24">
            <div>
              <div>
                <p className="mt-5 text-lg font-semibold leading-6 text-black">
                  Developer experience
                </p>
              </div>
              <div className="mt-2 text-base text-gray-600">
                Do what you think is right. Don&apos;t let people make the
                decision of right or wrong for you.
              </div>
            </div>
            <div>
              <div>
                <p className="mt-5 text-lg font-semibold leading-6 text-black">
                  Designers go-to app
                </p>
              </div>
              <div className="mt-2 text-base text-gray-600">
                Only you can take inner freedom away from yourself, or give it
                to yourself. Nobody else can
              </div>
            </div>
            <div>
              <div>
                <p className="mt-5 text-lg font-semibold leading-6 text-black">
                  Easy onboarding
                </p>
              </div>
              <div className="mt-2 text-base text-gray-600">
                Your greatest self has been waiting your whole life; don&apos;t
                make it wait any longer
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
