function NotFoundError(message) {
  this.message = message;
  this.name = "NotFoundError";
}

/* eslint-disable no-proto */
// no-proto is disabled to allow prototypal inheritance
// prototypal inharitance is used because node.js uses commonJS
NotFoundError.__proto__ = Error.prototype;
/* eslint-enable */

module.exports = NotFoundError;
