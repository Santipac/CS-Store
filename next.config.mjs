/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [{
          key: "Cache-Control",
          value: "s-maxage=1, stale-while-revalidate=59"
        }]
      }
    ]
  },
  images: {
    domains: ["lh3.googleusercontent.com", "platform-lookaside.fbsbx.com", "cs-store-arg.s3.us-west-1.amazonaws.com", "tailwindui.com"],
    unoptimized: true,
  },
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
