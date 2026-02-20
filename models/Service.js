const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Service", ServiceSchema);