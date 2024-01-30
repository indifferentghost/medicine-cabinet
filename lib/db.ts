import { defaultCollections } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import { Account, User } from "next-auth";

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"');
}

const uri = process.env.DB_URI;

console.log(uri, process.env.NODE_ENV);

let client;
export let clientPromise: Promise<MongoClient>;

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

if (process.env.NODE_ENV === "development") {
  //   // In development mode, use a global variable so that the value
  //   // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    try {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    } catch (e) {
      console.log(e);
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const mdb = client?.db();

export const users = mdb?.collection<
  User & { perscriptions: string[]; password: string }
>(defaultCollections.Users);

export const accounts = mdb?.collection<Account>(defaultCollections.Accounts);

await Promise.all([
  accounts?.createIndex({ userId: 1, providerId: 1 }, { unique: true }),
  users?.createIndex(
    { email: 1 },
    { unique: true, collation: { locale: "en", strength: 1 } }
  ),
  users?.createIndex({ id: 1 }, { unique: true }),
]);
