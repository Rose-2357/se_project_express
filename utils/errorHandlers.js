const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("./errors");

module.exports.handleGeneralError = (err, res) => {
  console.error(err);
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: "Internal server error" });
};

module.exports.handlePostError = (err, res, forUser = false) => {
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  if (forUser && err.code === 11000) {
    return res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: "Email already exists" });
  }
  return this.handleGeneralError(err, res);
};

module.exports.handleIdError = (err, res) => {
  if (err.name === "NotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  return this.handleGeneralError(err, res);
};

module.exports.handleLoginError = (err, res) => {
  if (err.name === "AuthenticationError") {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
  }

  return this.handleGeneralError(err, res);
};
