const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

class UnathorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnathorizedError";
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = UnathorizedError;
