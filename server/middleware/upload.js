const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Use memoryStorage — stream buffer to Cloudinary (works with cloudinary v2)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// After multer stores buffer, stream it to Cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const { Readable } = require("stream");
  const stream = cloudinary.uploader.upload_stream(
    { folder: "lab-reports", resource_type: "raw", format: "pdf" },
    (error, result) => {
      if (error) return next(error);
      req.file.path = result.secure_url; // attach URL for controller
      next();
    }
  );

  const readable = new Readable();
  readable.push(req.file.buffer);
  readable.push(null);
  readable.pipe(stream);
};

module.exports = { upload, uploadToCloudinary };
