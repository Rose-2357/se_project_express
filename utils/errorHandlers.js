const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("./errors");

function handleInternalServerError(err, res) {
  console.error(err);
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: "Internal server error" });
}

function handleValidationError(err, res) {
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  return undefined;
}

function handleConflictError(err, res) {
  if (err.code === 11000) {
    return res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "Email already exists" });
  }
  return undefined;
}

function handleNotFoundError(err, res) {
  if (err.name === "NotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
  }
  return undefined;
}

function handleCastError(err, res) {
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  return undefined;
}

function handleAuthenticationError(err, res) {
  if (err.name === "AuthenticationError") {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
  }
  return undefined;
}

function handleErrors(err, res, ...functions) {
  let returnValue;

  functions.forEach((func) => {
    if (typeof func !== "function")
      throw new Error("Parameters must be functions only");
    returnValue = func(err, res) || returnValue;
  });

  return returnValue || handleInternalServerError(err, res);
}

module.exports.handleGeneralError = handleInternalServerError;

module.exports.handlePostError = (err, res) =>
  handleErrors(err, res, handleValidationError, handleConflictError);

module.exports.handleIdError = (err, res) =>
  handleErrors(err, res, handleNotFoundError, handleCastError);

module.exports.handleLoginError = (err, res) =>
  handleErrors(err, res, handleValidationError, handleAuthenticationError);

module.exports.handleUpdateError = (err, res) =>
  handleErrors(
    err,
    res,
    handleNotFoundError,
    handleCastError,
    handleValidationError
  );
