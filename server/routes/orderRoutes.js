const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/auth");
const validate = require("../middleware/validate");

const verifyRules = [
  body("tests").isArray({ min: 1 }),
  body("bookingDate").notEmpty(),
  body("bookingSlot").notEmpty(),
  body("address").notEmpty(),
  body("razorpay_order_id").notEmpty(),
  body("razorpay_payment_id").notEmpty(),
  body("razorpay_signature").notEmpty(),
];

router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.post("/", protect, createOrder);        // <-- ye missing tha
router.post("/razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyRules, validate, verifyPaymentAndCreateOrder);
router.patch("/:id", protect, admin, updateOrderStatus);

module.exports = router;