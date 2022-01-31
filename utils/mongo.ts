import { MongoClient } from "mongodb";

const DATABASE = 'gc_amnt';
const url = process.env.MONGO_URL || "";

const client = new MongoClient(url);

export async function connect() {
  await client.connect();
  const db = client.db(DATABASE);
  return { db, client };
}