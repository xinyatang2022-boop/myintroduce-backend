 require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    console.log("XinyaDB =", process.env.XinyaDB);

    await mongoose.connect(process.env.XinyaDB, {
      serverSelectionTimeoutMS: 5000,  //more then 5s
      family: 4                        // use IPv4（soluting querySrv ）
    });

    console.log("MongoDB connected:", mongoose.connection.name);

  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    throw error;
  }
};
