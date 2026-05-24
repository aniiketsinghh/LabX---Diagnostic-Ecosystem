const sendSuccess = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: {},
  });
};

module.exports = { sendSuccess, sendError };
