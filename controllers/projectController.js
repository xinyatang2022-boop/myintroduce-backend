const Project = require("../models/Project");

//  convert_id to id and delate _id / __v
const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// CREATE
exports.createProject = async (req, res, next) => {
  try {
    const created = await Project.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

// READ ALL
exports.getProjects = async (req, res, next) => {
  try {
    const list = await Project.find();
    return res.status(200).json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getProjectById = async (req, res, next) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Project not found." });

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully.",
      data: toClient(doc),
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE (success + message)
exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ success: false, message: "Project not found." });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE ( success + message)
exports.deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Project not found." });

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};