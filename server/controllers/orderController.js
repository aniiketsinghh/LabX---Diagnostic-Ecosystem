const Order = require("../models/Order");
const Test = require("../models/Test");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// @route  POST /api/orders
// @access Private (user)
const createOrder = asyncHandler(async (req, res) => {
  const { tests, bookingDate, bookingSlot, address } = req.body;

  // Fetch all tests to calculate total
  const testDocs = await Test.find({ _id: { $in: tests } });
  if (testDocs.length !== tests.length) {
    return sendError(res, "One or more test IDs are invalid.", 400);
  }

  const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);

  const order = await Order.create({
    userId: req.user._id,
    tests,
    totalAmount,
    bookingDate,
    bookingSlot,
    address,
  });

  return sendSuccess(res, "Order created successfully.", { order }, 201);
});

// @route  GET /api/orders/my
// @access Private (user)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate("tests", "title price category")
    .sort({ createdAt: -1 });

  return sendSuccess(res, "Your orders fetched successfully.", { orders });
});

// @route  GET /api/orders
// @access Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email phone")
    .populate("tests", "title price category")
    .sort({ createdAt: -1 });

  return sendSuccess(res, "All orders fetched successfully.", { orders });
});

// @route  PATCH /api/orders/:id
// @access Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const validStatuses = ["Pending", "Sample Collected", "Testing", "Report Uploaded", "Completed"];
  if (orderStatus && !validStatuses.includes(orderStatus)) {
    return sendError(res, "Invalid order status.", 400);
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { ...(orderStatus && { orderStatus }), ...(paymentStatus && { paymentStatus }) },
    { new: true, runValidators: true }
  ).populate("userId", "name email");

  if (!order) return sendError(res, "Order not found.", 404);

  return sendSuccess(res, "Order status updated.", { order });
});

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
