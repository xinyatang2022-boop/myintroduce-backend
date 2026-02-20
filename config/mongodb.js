// config/mongodb.js
require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.XinyaDB);
    console.log("✅ MongoDB connected:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};
