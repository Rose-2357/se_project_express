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
const { BAD_REQUEST_ERROR_CODE } = require("../utils/errors");

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
        delete newUser._doc.password;
        res.status(201).send({ data: newUser });
      })
      .catch((err) => {
        handlePostError(err, res, true);
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const emptyField = !email ? "email" : "password";
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: `${emptyField} must be filled` });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
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
      delete newData._doc.password;
      res.send({ data: newData });
    })

    .catch((err) => {
      handleUpdateError(err, res);
    });
};
