const Reference = require("../models/Reference");

//  convert_id to id and delate _id / __v
function toClient(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
}
//created
exports.createReference = async (req, res, next) => {
  try {
    const created = await Reference.create(req.body);
    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};
//read all
exports.getAllReferences = async (req, res, next) => {
  try {
    const list = await Reference.find().sort({ _id: -1 });
    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};
//read one
exports.getReferenceById = async (req, res, next) => {
  try {
    const doc = await Reference.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Reference not found" });
    }
    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: toClient(doc),
    });
  } catch (err) {
    next(err);
  }
};

//updated
exports.updateReference = async (req, res, next) => {
  try {
    const updated = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Reference not found" });
    }
    res.json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};
//deleted
exports.deleteReference = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Reference not found" });
    }
    res.json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};