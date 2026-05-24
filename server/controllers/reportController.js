const Report = require("../models/Report");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// @route  POST /api/reports/upload
// @access Admin
const uploadReport = asyncHandler(async (req, res) => {
  const { userId, orderId } = req.body;

  if (!req.file) {
    return sendError(res, "PDF report file is required.", 400);
  }

  // Verify the order exists and belongs to the given user
  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) {
    return sendError(res, "Order not found for this user.", 404);
  }

  const reportPdfUrl = req.file.path; // Cloudinary URL

  const report = await Report.create({ userId, orderId, reportPdfUrl });

  // Update order status to "Report Uploaded"
  await Order.findByIdAndUpdate(orderId, { orderStatus: "Report Uploaded" });

  return sendSuccess(res, "Report uploaded successfully.", { report }, 201);
});

// @route  GET /api/reports/my
// @access Private (user)
const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ userId: req.user._id })
    .populate("orderId", "bookingDate bookingSlot orderStatus tests")
    .sort({ uploadedAt: -1 });

  return sendSuccess(res, "Your reports fetched successfully.", { reports });
});

module.exports = { uploadReport, getMyReports };
