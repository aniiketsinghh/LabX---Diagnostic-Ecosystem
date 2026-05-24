const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    message = "Resource not found. Invalid ID format.";
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists.`;
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: {},
  });
};

module.exports = errorHandler;
