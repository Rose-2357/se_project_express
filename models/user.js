const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { urlValidator, emailValidator } = require("../utils/validators");
const UnathorizedError = require("../customError/UnathorizedError");
const BadRequestError = require("../customError/BadRequestError");
const validationMessages = require("../utils/validationMessages");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessages.NAME.REQUIRED],
    minlength: [2, validationMessages.NAME.MIN],
    maxlength: [30, validationMessages.NAME.MAX],
  },
  avatar: {
    type: String,
    validate: urlValidator,
  },
  email: {
    type: String,
    required: [true, validationMessages.EMAIL.REQUIRED],
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, validationMessages.PASSWORD.REQUIRED],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  if (!email || !password) {
    const emptyField = !email ? "email" : "password";
    next(new BadRequestError(`The "${emptyField}" field must be filled`));
  }
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new UnathorizedError("incorrext email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new UnathorizedError("incorrext email or password"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
