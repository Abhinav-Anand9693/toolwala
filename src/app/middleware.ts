import { clerkMiddleware } from "@clerk/nextjs/server";
import { boolean } from "zod";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
  ],
};