import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { type NextRequestWithAuth, withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const requestedPage = req.nextUrl.pathname;
  if (requestedPage.startsWith("/checkout")) {
    if (!session) {
      const url = req.nextUrl.clone();
      const loginPage = "/auth/signin";
      url.pathname = loginPage;
      url.search = `page=${requestedPage}`;

      return NextResponse.redirect(new URL(url));
    }
  }
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/checkout/:path*",
};
