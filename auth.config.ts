import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = await LoginSchema.parseAsync(credentials);

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          throw new Error("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("Wrong password");
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
