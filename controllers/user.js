const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal server error" })
    );
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      const error = new Error("ID was not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "NotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send(err.message);
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR_CODE).send(err.message);
      }
      res.status(INTERNAL_SERVER_ERROR_CODE).send(err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR_CODE).send(err.message);
      }
      res.status(INTERNAL_SERVER_ERROR_CODE).send(err);
    });
};
