const Order = require("../models/Order");
const Test = require("../models/Test");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");
const crypto = require("crypto");

// Razorpay conditionally load karo
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  const Razorpay = require("razorpay");
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// @route  POST /api/orders/razorpay-order
// @access Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { tests } = req.body;

  const testDocs = await Test.find({ _id: { $in: tests } });
  if (testDocs.length !== tests.length) {
    return sendError(res, "One or more test IDs are invalid.", 400);
  }

  const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);
  const tax = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + tax;

  // Mock mode — no Razorpay keys
  if (!razorpay) {
    return sendSuccess(res, "Mock order created.", {
      razorpayOrderId: "mock_order_" + Date.now(),
      amount: grandTotal,
      currency: "INR",
      keyId: "mock",
    });
  }

  // Real Razorpay
  const rzpOrder = await razorpay.orders.create({
    amount: grandTotal * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  return sendSuccess(res, "Razorpay order created.", {
    razorpayOrderId: rzpOrder.id,
    amount: grandTotal,
    currency: "INR",
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

// @route  POST /api/orders/verify-payment
// @access Private
const verifyPaymentAndCreateOrder = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    tests,
    bookingDate,
    bookingSlot,
    address,
    patient,
  } = req.body;

  // Mock mode — signature verify skip karo
  if (!razorpay) {
    const testDocs = await Test.find({ _id: { $in: tests } });
    const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);
    const tax = Math.round(totalAmount * 0.05);

    const order = await Order.create({
      userId: req.user._id,
      tests,
      totalAmount: totalAmount + tax,
      bookingDate,
      bookingSlot,
      address,
      paymentStatus: "Paid",
      orderStatus: "Pending",
      razorpayOrderId: razorpay_order_id || "mock",
      razorpayPaymentId: razorpay_payment_id || "mock",
      patient,
    });

    return sendSuccess(res, "Mock order created successfully.", { order }, 201);
  }

  // Real signature verify
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return sendError(res, "Payment verification failed.", 400);
  }

  const testDocs = await Test.find({ _id: { $in: tests } });
  const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);
  const tax = Math.round(totalAmount * 0.05);

  const order = await Order.create({
    userId: req.user._id,
    tests,
    totalAmount: totalAmount + tax,
    bookingDate,
    bookingSlot,
    address,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    patient,
  });

  return sendSuccess(res, "Payment verified and order created.", { order }, 201);
});

// @route  POST /api/orders (direct — mock flow frontend se)
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const { tests, bookingDate, bookingSlot, address, patient } = req.body;

  const testDocs = await Test.find({ _id: { $in: tests } });
  if (testDocs.length !== tests.length) {
    return sendError(res, "One or more test IDs are invalid.", 400);
  }

  const totalAmount = testDocs.reduce((sum, t) => sum + t.price, 0);
  const tax = Math.round(totalAmount * 0.05);

  const order = await Order.create({
    userId: req.user._id,
    tests,
    totalAmount: totalAmount + tax,
    bookingDate,
    bookingSlot,
    address,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    patient,
  });

  return sendSuccess(res, "Order created successfully.", { order }, 201);
});

// @route  GET /api/orders/my
// @access Private
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

module.exports = {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};