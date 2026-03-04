const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { urlValidator, emailValidator } = require("../utils/validators");
const AuthenticationError = require("../customError/AuthenticationError");

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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError());
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthenticationError());
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
