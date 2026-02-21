const Service = require("../models/Service");

//  convert_id to id and delate _id / __v
const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};
//ceated
exports.createService = async (req, res, next) => {
  try {
    const created = await Service.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};
//read all
exports.getServices = async (req, res, next) => {
  try {
    const list = await Service.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Services list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};
//read one
exports.getServiceById = async (req, res, next) => {
  try {
    const doc = await Service.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Service not found." });

    return res.status(200).json({
      success: true,
      message: "Service fetched successfully.",
      data: toClient(doc),
    });
  } catch (err) {
    next(err);
  }
};
//updated
exports.updateService = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Service not found." });

    return res.status(200).json({ success: true, message: "Service updated successfully." });
  } catch (err) {
    next(err);
  }
};
//delated
exports.deleteService = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Service not found." });

    return res.status(200).json({ success: true, message: "Service deleted successfully." });
  } catch (err) {
    next(err);
  }
};