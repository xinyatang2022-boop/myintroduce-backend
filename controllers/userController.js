const User = require("../models/User");

//  convert_id to id and delate _id / __v
const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

// CREATE
exports.createUser = async (req, res, next) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

// READ ALL
exports.getUsers = async (req, res, next) => {
  try {
    const list = await User.find().sort({ created: -1 });
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

// READ ONE
exports.getUserById = async (req, res, next) => {
  try {
    const item = await User.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: toClient(item),
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
     
    });
  } catch (err) {
    next(err);
  }
};