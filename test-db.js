// test-db.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.log("❌ MONGODB_URI not found in .env");
      return;
    }

    console.log("🔄 Trying to connect to MongoDB...");
    const client = new MongoClient(uri);

    await client.connect();

    console.log("✅ SUCCESS! Connected to MongoDB!");
    await client.close();
  } catch (err) {
    console.log("❌ FAILED to connect to MongoDB");
    console.error(err);
  }
}

testConnection();
