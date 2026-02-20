const mongoose = require("mongoose");

const ReferenceSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  position: { type: String },
  company: { type: String },
});

module.exports = mongoose.model("Reference", ReferenceSchema);