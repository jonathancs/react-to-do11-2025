// db.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();


const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db("todo_app");
  }
  return db;
}

export { getDb };
