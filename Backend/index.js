import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enhanced CORS configuration for deployment (Updated V2)
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// using middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsOptions));

// Health check endpoint for deployment
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "AI Chatbot API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const { User } = await import("./models/User.js");
    const count = await User.countDocuments();
    res.json({
      message: "Database connection successful",
      userCount: count,
      dbState: mongoose.connection.readyState
    });
  } catch (error) {
    res.status(500).json({
      message: "Database check failed",
      error: error.message
    });
  }
});


import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

const PORT = parseInt((process.env.PORT || "5000").toString().trim(), 10) || 5000;

connectDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(` Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}).catch((error) => {
  console.error(" Database connection failed:", error);
  process.exit(1);
});
