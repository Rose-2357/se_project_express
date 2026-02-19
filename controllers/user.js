const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../customError/NotFoundError");
const User = require("../models/user");
const {
  handleGeneralError,
  handlePostError,
  handleIdError,
  handleLoginError,
} = require("../utils/errorHandlers");
const { USER_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");
const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((newUser) => res.status(201).send({ data: newUser }))
      .catch((err) => {
        handlePostError(err, res, true);
      });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

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
