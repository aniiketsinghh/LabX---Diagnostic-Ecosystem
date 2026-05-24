const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/auth");
const validate = require("../middleware/validate");

const orderRules = [
  body("tests").isArray({ min: 1 }).withMessage("At least one test is required"),
  body("bookingDate").notEmpty().withMessage("Booking date is required"),
  body("bookingSlot").notEmpty().withMessage("Booking slot is required"),
  body("address").notEmpty().withMessage("Address is required"),
];

// IMPORTANT: /my must come before /:id to avoid conflict
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.post("/", protect, orderRules, validate, createOrder);
router.patch("/:id", protect, admin, updateOrderStatus);

module.exports = router;
