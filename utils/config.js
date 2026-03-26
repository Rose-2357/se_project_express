const { JWT_SECRET = "secret-key" } = process.env;
const { createSecretKey } = require("crypto");

module.exports = { JWT_SECRET: createSecretKey(JWT_SECRET) };
