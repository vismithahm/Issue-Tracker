import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import issueRoutes from "./routes/issueRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("RUSHDR backend running");
});

app.get("/api/test", (_req, res) => {
  res.json({
    message: "RUSHDR backend is working",
  });
});

app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing from .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });