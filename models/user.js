const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { urlValidator, emailValidator } = require("../utils/validators");
const UnathorizedError = require("../customError/UnathorizedError");
const BadRequestError = require("../customError/BadRequestError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  avatar: {
    type: String,
    validate: urlValidator,
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled'],
    unique: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, 'The "password" field must be filled'],
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
