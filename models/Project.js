const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

ProjectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,//delate _v
  transform: (doc, ret) => {
    ret.id = ret._id;//id
    delete ret._id;//delate _id
  },
});
module.exports = mongoose.model("Project", ProjectSchema);
