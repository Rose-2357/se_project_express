const { FORBIDDEN_ERROR_CODE } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor() {
    super("Action is not allowed");
    this.name = "ForbiddenError";
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ForbiddenError;
