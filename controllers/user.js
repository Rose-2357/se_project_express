const bcrypt = require("bcryptjs");
const NotFoundError = require("../customError/NotFoundError");
const User = require("../models/user");
const {
  handleGeneralError,
  handlePostError,
  handleIdError,
} = require("../utils/errorHandlers");
const { USER_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleGeneralError(err, res));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
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
      .then((newUser) => res.status(201).send({ data: newUser }))
      .catch((err) => {
        handlePostError(err, res, true);
      });
  });
};
