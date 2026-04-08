const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function toClient(user) {
  return {
    id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    created: user.created,
    updated: user.updated,
  };
}

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
      created: new Date(),
      updated: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: toClient(newUser),
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET || "comp229_secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: toClient(user),
    });
  } catch (err) {
    next(err);
  }
};