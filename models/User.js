const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
