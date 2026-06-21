const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Proper CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lab Booking API is running.",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
    data: {},
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;