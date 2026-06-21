const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Sample Collected",
        "Testing",
        "Report Uploaded",
        "Completed",
      ],
      default: "Pending",
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    bookingSlot: {
      type: String, // e.g. "09:00 AM - 10:00 AM"
      required: [true, "Booking slot is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    patient: {
      fullName: String,
      age: Number,
      gender: String,
      phone: String,
      email: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
