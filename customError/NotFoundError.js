function NotFoundError(message) {
  this.message = message;
  this.name = "NotFoundError";
}

NotFoundError.__proto__ = Error.prototype;

module.exports = NotFoundError;
