const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Test title is required"], trim: true },
    category: { type: String, required: [true, "Category is required"], trim: true },
    categorySlug: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: [true, "Price is required"], min: 0 },
    mrp: { type: Number, default: 0 },
    fastingRequired: { type: Boolean, default: false },
    reportTime: { type: String, default: "24 hours" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
