 require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    console.log("XinyaDB =", process.env.XinyaDB);

    await mongoose.connect(process.env.XinyaDB, {
      serverSelectionTimeoutMS: 5000,  // 5 秒超时
      family: 4                        // 强制 IPv4（解决 querySrv 问题）
    });

    console.log("✅ MongoDB connected:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error);
  }
};
