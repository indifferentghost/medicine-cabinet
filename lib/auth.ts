import NextAuth from "next-auth";
import type { NextAuthConfig, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { clientPromise } from "./db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import argon2 from "argon2";

export const authAdapter = MongoDBAdapter(clientPromise);

declare module "next-auth" {
  interface AdapterUser extends User {
    password: string;
    perscriptions: string[];
  }
}
export const authConfig = {
  debug: true,
  adapter: authAdapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(c) {
        const user = await authAdapter.getUserByEmail?.(c.email as string);
        if (
          user &&
          // @ts-expect-error problems overridign AdaptiveUser from "@auth/core/types" a transitive dependency
          (await argon2.verify(user.password, c.password as string))
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }: { auth: Session | null }) => {
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
