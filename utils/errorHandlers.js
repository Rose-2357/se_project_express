const BadRequestError = require("../customError/BadRequestError");
const ConflictError = require("../customError/ConflictError");

module.exports.handleIdError = (err, next) => {
  if (err.name === "CastError") {
    next(new BadRequestError("Invalid ID format"));
  } else {
    next(err);
  }
};

module.exports.handleValidationError = (err, next) => {
  if (err.code === 11000) {
    next(new ConflictError("Email already exists"));
  } else if (err.name === "ValidationError") {
    next(new BadRequestError(err.message));
  } else {
    next(err);
  }
};

module.exports.handleUpdateError = (err, next) => {
  if (err.name === "CastError") {
    next(new BadRequestError("Invalid ID format"));
  } else if (err.name === "ValidationError") {
    next(new BadRequestError(err.message));
  } else {
    next(err);
  }
};
