const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnathorizedError = require("../customError/UnathorizedError");

function handleAuthError(next) {
  next(new UnathorizedError("AuthorizationError"));
}

function extractBearerToken(header) {
  return header.replace("Bearer ", "");
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};
