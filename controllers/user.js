const NotFoundError = require("../customError/NotFoundError");
const User = require("../models/user");
const {
  handleGeneralError,
  handlePostError,
  handleIdError,
} = require("../utils/errorHandlers");
const {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => handleGeneralError(res));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      throw new NotFoundError("User was not found: invalid ID");
    })
    .then((user) => res.send(user))
    .catch((err) => handleIdError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => {
      handlePostError(err, res);
    });
};
