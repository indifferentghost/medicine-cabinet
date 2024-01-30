import NextAuth, { NextAuthConfig, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { accounts, clientPromise, users } from "./db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import argon2 from "argon2";
import {
  email,
  minLength,
  object,
  safeParse,
  string,
  toTrimmed,
} from "valibot";
import { MongoServerError, ObjectId } from "mongodb";
import { randomUUID } from "crypto";

export const authAdapter = MongoDBAdapter(clientPromise);

export const credentialsSchema = object({
  email: string([toTrimmed(), minLength(1), email()]),
  password: string([toTrimmed(), minLength(1)]),
});

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};

export const authConfig = {
  debug: true,
  adapter: authAdapter,
  session: {
    strategy: "database",
  },
  theme: {
    brandColor: "hsl(142.1 70.6% 45.3%)", // --primary
  } satisfies NextAuthConfig["theme"],
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = safeParse(credentialsSchema, credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.output;
        const user = await authAdapter.getUserByEmail?.(email)
        if (!user) {
          return null;
        }
        const dbUser = await users?.findOne({ email: user.email });
        if (!dbUser) throw new Error('this should never happen');
        const isSamePassword = await argon2.verify(dbUser.password, password);
        if (!isSamePassword) return null;
        return dbUser;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth?.user;
    },
    async signIn({ user, account, email, credentials }) {
      // if (
      //   req.query.nextauth.includes("callback") &&
      //   req.query.nextauth.includes("credentials") &&
      //   req.method === "POST"
      // ) {
      authAdapter.createSession?.({
        sessionToken: randomUUID(),
        userId: user.id,
        expires: fromDate(2592000), // TODO:TD-27-01-24 this is the default from AuthJS, we should probably use an exact reference
      });

      return true;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {

  const userId = new ObjectId().toString("hex");

  try {
    const { acknowledged, insertedId } =
      (await users?.insertOne({
        id: userId,
        email,
        password: await argon2.hash(password),
        perscriptions: [],
      })) ?? {};

    if (!acknowledged) {
      throw new Error("Couldn't insert new user into DB");
    }

    console.log(insertedId, userId);
  } catch (e) {
    if (e instanceof MongoServerError) {
      if (e.code === 11000) {
        throw new Error("User exists with that email");
      }
    }
    console.log(e);
    throw new Error("Unknown error");
  }

  try {
    const { acknowledged, insertedId } =
      (await accounts?.insertOne({
        userId,
        type: "credentials",
        provider: "credentials",
        providerAccountId: userId,
      })) ?? {};

    if (!acknowledged) {
      throw new Error("Unable to link account to created user profile");
    }
  } catch (e) {
    if (e instanceof MongoServerError) {
      if (e.code === 11000) {
        throw new Error("Account exists with `userId`"); // this shouldn't happen
      }
    }

    console.log(e);
    throw new Error("Unknown error");
  }
};
