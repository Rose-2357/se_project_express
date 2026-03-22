const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, meta, message }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "logs/request.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      format: winston.format.json(),
    }),
  ],
});
