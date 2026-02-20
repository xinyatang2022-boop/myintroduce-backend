const projectRoutes = require("./routes/projectRoutes");

const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const connectDB = require("./config/mongodb");

const app = express();
require("./config/express")(app);
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Portfolio Backend is running" });
});
app.get("/db", (req, res) => {
  res.json({ db: mongoose.connection.db.databaseName });
});

app.use("/api/projects", projectRoutes);


// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Endpoint not found"));
});

// global error handler (must be last)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
