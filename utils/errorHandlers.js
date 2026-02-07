const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} = require("./errors");

module.exports.handleGeneralError = (res) => {
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .send({ message: "Internal server error" });
};

module.exports.handlePostError = (err, res) => {
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  return res.status(INTERNAL_SERVER_ERROR_CODE).send(err);
};

module.exports.handleIdError = (err, res) => {
  if (err.name === "NotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }
  return res.status(INTERNAL_SERVER_ERROR_CODE).send(err);
};
