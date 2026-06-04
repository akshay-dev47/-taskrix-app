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
mongoose.set("bufferCommands", false);

const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://taskrix-app.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.static(".")); // Serve static files

let dbConnectionPromise = null;

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (dbConnectionPromise) return dbConnectionPromise;

  const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/taskrix";

  dbConnectionPromise = mongoose
    .connect(mongoUrl, {
      serverSelectionTimeoutMS: 8000,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      dbConnectionPromise = null;
      console.error("MongoDB connection error:", error.message);
      throw error;
    });

  return dbConnectionPromise;
};

const requireDatabase = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      error:
        "Database connection failed. Check MONGODB_URI and MongoDB Atlas network access.",
    });
  }
};

// Routes
app.use("/api/auth", requireDatabase, authRoutes);
app.use("/api/tasks", requireDatabase, authMiddleware, taskRoutes);

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({
      status: "OK",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "OK",
      database: "not connected",
      message:
        "Check MONGODB_URI in Vercel and allow network access in MongoDB Atlas.",
    });
  }
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(new URL("assets/logo/taskrix-logo.png", import.meta.url).pathname);
});

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(new URL("index.html", import.meta.url).pathname);
});

connectDB().catch(() => {
  console.log("Database will be retried on the next API request");
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
