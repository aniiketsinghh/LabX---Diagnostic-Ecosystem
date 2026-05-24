const { validationResult } = require("express-validator");
const { sendError } = require("../utils/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return sendError(res, message, 422);
  }
  next();
};

module.exports = validate;
