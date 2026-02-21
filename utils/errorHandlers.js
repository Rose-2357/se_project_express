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
}

function handleConflictError(err, res) {
  if (err.code === 11000) {
    return res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "Email already exists" });
  }
}

function handleNotFoundError(err, res) {
  if (err.name === "NotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
  }
}

function handleCastError(err, res) {
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
}

function handleAuthenticationError(err, res) {
  if (err.name === "AuthenticationError") {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
  }
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

module.exports.handlePostError = (err, res, forUser = false) => {
  return handleErrors(err, res, handleValidationError, handleConflictError);
};

module.exports.handleIdError = (err, res) => {
  return handleErrors(err, res, handleNotFoundError, handleCastError);
};

module.exports.handleLoginError = (err, res) => {
  return handleErrors(err, res, handleAuthenticationError);
};

module.exports.handleUpdateError = (err, res) => {
  return handleErrors(
    err,
    res,
    handleNotFoundError,
    handleCastError,
    handleValidationError
  );
};
