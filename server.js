import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import { authMiddleware } from "./auth.js";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Serve static files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(new URL("index.html", import.meta.url).pathname);
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGODB_URI || "mongodb://localhost:27017/taskrix";
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Warning: Running in demo mode without persistent database");
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
