import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }
}

import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole|null &DefaultJWT["role"];
  }
}
