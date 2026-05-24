const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Test title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    fastingRequired: {
      type: Boolean,
      default: false,
    },
    reportTime: {
      type: String, // e.g. "24 hours", "48 hours"
      default: "24 hours",
    },
    image: {
      type: String, // Cloudinary URL
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
