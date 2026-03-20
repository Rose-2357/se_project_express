const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../customError/NotFoundError");
const User = require("../models/user");
const { USER_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../customError/BadRequestError");
const {
  handleIdError,
  handleValidationError,
  handleUpdateError,
} = require("../utils/errorHandlers");

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  return User.findById(_id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => handleIdError(err, next));
};

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((newUser) => {
        const data = { ...newUser._doc };
        delete data.password;
        res.status(201).send({ data });
      })
      .catch((err) => handleValidationError(err, next));
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        const emptyField = !email ? "email" : "password";
        throw new ValidationError(`The "${emptyField}" field must be filled`);
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => handleValidationError(err, next));
};

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((newData) => {
      res.send({ data: newData });
    })

    .catch((err) => handleUpdateError(err, next));
};
