import { auth } from "@/auth"
 
export default auth((req) => {
  const { pathname } = req.nextUrl;

  const publicPages = ["/", "/login", "/register"];

  if (!req.auth && !publicPages.includes(pathname)) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (req.auth && publicPages.includes(pathname)) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

});

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
