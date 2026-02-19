const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

function handleAuthError(res) {
  res.status(UNAUTHORIZED_ERROR_CODE).send({ message: "Authorization Error" });
}

function extractBearerToken(header) {
  return header.replace("Bearer ", "");
}

module.exports = (req, res, next) => {
  const { authorization } = req.header;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token);
  } catch (err) {
    return handleAuthError;
  }

  req.user = payload;

  next();
};
