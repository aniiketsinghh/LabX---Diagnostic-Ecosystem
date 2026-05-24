const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendError } = require("../utils/response");

// @route  POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return sendError(res, "Email is already registered.", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  const token = user.generateToken();

  return res.status(201).json({
    success: true,
    message: "Registration successful.",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  });
});

// @route  POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return sendError(res, "Invalid email or password.", 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return sendError(res, "Invalid email or password.", 401);
  }

  const token = user.generateToken();

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  });
});

// @route  GET /api/auth/profile
// @access Private
const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    user: req.user,
  });
});

module.exports = {
  register,
  login,
  getProfile,
};