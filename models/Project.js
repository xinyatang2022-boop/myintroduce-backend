const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String },
  completion: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model("Project", ProjectSchema);