import * as dotenv from "dotenv";
dotenv.config();

import { ConnectOptions, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

if (!process.env.MONGODB_URI) {
  throw new Error("unvalid mongodb URI");
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise
