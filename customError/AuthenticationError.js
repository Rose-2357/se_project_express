class AuthenticationError extends Error {
  constructor() {
    super("Incorrect email or password");
    this.name = "AuthenticationError";
  }
}

module.exports = AuthenticationError;
