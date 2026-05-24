const Test = require("../models/Test");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// @route  GET /api/tests
// @access Public
const getAllTests = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const tests = await Test.find(filter).sort({ createdAt: -1 });
  return sendSuccess(res, "Tests fetched successfully.", { tests });
});

// @route  GET /api/tests/:id
// @access Public
const getTestById = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return sendError(res, "Test not found.", 404);
  return sendSuccess(res, "Test fetched successfully.", { test });
});

// @route  POST /api/tests
// @access Admin
const createTest = asyncHandler(async (req, res) => {
  const { title, category, description, price, fastingRequired, reportTime, image } = req.body;
  const test = await Test.create({ title, category, description, price, fastingRequired, reportTime, image });
  return sendSuccess(res, "Test created successfully.", { test }, 201);
});

// @route  PUT /api/tests/:id
// @access Admin
const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!test) return sendError(res, "Test not found.", 404);
  return sendSuccess(res, "Test updated successfully.", { test });
});

// @route  DELETE /api/tests/:id
// @access Admin
const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findByIdAndDelete(req.params.id);
  if (!test) return sendError(res, "Test not found.", 404);
  return sendSuccess(res, "Test deleted successfully.", {});
});

module.exports = { getAllTests, getTestById, createTest, updateTest, deleteTest };
