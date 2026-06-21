const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendError } = require("../utils/response");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return sendError(res, "Not authorized. No token provided.", 401);
  }

  // Admin static token check
  if (token === process.env.ADMIN_STATIC_TOKEN) {
    req.user = { _id: "admin", name: "Admin", email: "admin@labx.in", role: "admin" };
    return next();
  }

  // Normal JWT check
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return sendError(res, "User not found.", 401);
    }

    next();
  } catch (err) {
    return sendError(res, "Invalid or expired token.", 401);
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return sendError(res, "Access denied. Admins only.", 403);
};

module.exports = { protect, admin };