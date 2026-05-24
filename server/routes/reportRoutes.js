const express = require("express");
const router = express.Router();

const { uploadReport, getMyReports } = require("../controllers/reportController");
const { protect, admin } = require("../middleware/auth");
const { upload, uploadToCloudinary } = require("../middleware/upload");

// Admin uploads PDF for a specific order/user
router.post(
  "/upload",
  protect,
  admin,
  upload.single("report"),
  uploadToCloudinary,
  uploadReport
);

// User fetches their own reports
router.get("/my", protect, getMyReports);

module.exports = router;
