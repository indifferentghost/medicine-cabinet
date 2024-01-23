import { MongoClient } from "mongodb"

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"')
}

const uri = process.env.DB_URI
const options = {}

console.log(uri, process.env.NODE_ENV);

let client
export let clientPromise: Promise<MongoClient>

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}


if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    try {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect();
    } catch(e) {
      console.log(e)
    }
  }
    clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect();
}

export const mdb = client?.db()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.