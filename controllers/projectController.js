const Project = require("../models/Project");

// helper: consistent response format
const ok = (res, message, data) => res.status(200).json({ success: true, message, data });
const created = (res, message, data) => res.status(201).json({ success: true, message, data });
const fail = (res, status, message) => res.status(status).json({ success: false, message });

// CREATE (add)
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return created(res, "Project created successfully", project);
  } catch (error) {
    return fail(res, 400, error.message);
  }
};

// READ ALL (getAll)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return ok(res, "Projects fetched successfully", projects);
  } catch (error) {
    return fail(res, 500, error.message);
  }
};

// READ ONE (getByID)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return fail(res, 404, "Project not found");
    return ok(res, "Project fetched successfully", project);
  } catch (error) {
    // invalid ObjectId
    return fail(res, 400, "Invalid project id");
  }
};

// UPDATE (updateByID)
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return fail(res, 404, "Project not found");
    // PDF: update only returns success + message (no data)
    return ok(res, "Project updated successfully");
  } catch (error) {
    return fail(res, 400, error.message);
  }
};

// DELETE (deleteByID)
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return fail(res, 404, "Project not found");
    // PDF: delete only returns success + message (no data)
    return ok(res, "Project deleted successfully");
  } catch (error) {
    return fail(res, 400, "Invalid project id");
  }
};
