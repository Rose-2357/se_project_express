const { CONFLICT_ERROR_CODE } = require("../utils/errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
