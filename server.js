const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
require("./config/express")(app);

// test routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "Portfolio Backend is running" });
});
app.get("/db", (req, res) => {
  if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
    return res.status(500).json({
      success: false,
      message: "MongoDB not connected",
      readyState: mongoose.connection.readyState,
    });
  }
  res.json({ success: true, db: mongoose.connection.db.databaseName });
});

// 404
app.use((req, res, next) => next(createError(404, "Endpoint not found")));

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });