// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { getDb } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection("configs").findOne({ _id: "tasks" });
    res.json(doc?.tasks || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

app.put("/api/tasks", async (req, res) => {
  try {
    const tasks = req.body.tasks;
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: "tasks must be an array" });
    }

    const db = await getDb();
    await db.collection("configs").updateOne(
      { _id: "tasks" },
      { $set: { tasks } },
      { upsert: true }
    );

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save tasks" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
