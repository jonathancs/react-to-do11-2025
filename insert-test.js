// insert-test.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("❌ MONGODB_URI not found in .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("🔄 Connected. Inserting test document...");

    const db = client.db("todo_app");     // <-- your DB name
    const collection = db.collection("tasks"); // <-- your collection name

    const testTask = {
      id: Date.now(),
      text: "TEST TASK FROM SCRIPT",
      isComplete: false,
      parentId: null,
    };

    const result = await collection.insertOne(testTask);

    console.log("✅ Inserted!");
    console.log("Inserted ID:", result.insertedId);

  } catch (err) {
    console.log("❌ Error inserting document");
    console.error(err);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run();
