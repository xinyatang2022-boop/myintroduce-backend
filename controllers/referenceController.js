const Reference = require("../models/Reference");

const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// CREATE
exports.createReference = async (req, res, next) => {
  try {
    const created = await Reference.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

// READ ALL
exports.getReferences = async (req, res, next) => {
  try {
    const list = await Reference.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "References fetched successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getReferenceById = async (req, res, next) => {
  try {
    const item = await Reference.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Reference not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Reference fetched successfully.",
      data: toClient(item),
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateReference = async (req, res, next) => {
  try {
    const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Reference not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reference updated successfully.",
      data: toClient(updated),
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteReference = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Reference not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reference deleted successfully.",
      data: toClient(deleted),
    });
  } catch (err) {
    next(err);
  }
};