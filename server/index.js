import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static("uploads"));

// Request Logger (Only in development)
app.use((req, res, next) => {
  if (NODE_ENV === "development") {
    console.log(`[Request] ${req.method} ${req.url}`);
  }
  next();
});

import authRoutes from "./routes/auth.js";
import customerAuthRoutes from "./routes/customerAuth.js";
import collectionRoutes from "./routes/collections.js";
import productRoutes from "./routes/products.js";

import attributeRoutes from "./routes/attributes.js";

app.use("/api/auth", authRoutes); // Dashboard Admin Auth
app.use("/api/customer-auth", customerAuthRoutes); // Website Customer Auth
app.use("/api/collections", collectionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/attributes", attributeRoutes);
import journalRoutes from "./routes/journals.js";
import inquiryRoutes from "./routes/inquiries.js";

app.use("/api/journals", journalRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "GemsMuse Backend Running", environment: NODE_ENV });
});

// Database check
app.get("/api/db-check", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ message: "Database Connected Successfully", result: rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({
      error: "Internal Server Error",
      ...(NODE_ENV === "development" && { details: err.message }),
    });
});

// Global Error Handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
