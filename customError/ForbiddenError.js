class ForbiddenError extends Error {
  constructor() {
    super("Action is not allowed");
    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
