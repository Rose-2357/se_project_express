const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../customError/NotFoundError");
const User = require("../models/user");
const {
  handlePostError,
  handleIdError,
  handleLoginError,
  handleUpdateError,
} = require("../utils/errorHandlers");
const { USER_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");
const { JWT_SECRET } = require("../utils/config");

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;

  return User.findById(_id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.send(user))
    .catch((err) => handleIdError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((newUser) => {
        const data = { ...newUser._doc };
        delete data.password;
        res.status(201).send({ data });
      })
      .catch((err) => {
        handlePostError(err, res, true);
      });
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
    .catch((err) => {
      handleLoginError(err, res);
    });
};

module.exports.updateUser = (req, res) => {
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

    .catch((err) => {
      handleUpdateError(err, res);
    });
};
