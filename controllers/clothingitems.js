const NotFoundError = require("../customError/NotFoundError");
const Item = require("../models/clothingitems");
const {
  handleGeneralError,
  handlePostError,
  handleIdError,
} = require("../utils/errorHandlers");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(() => {
      handleGeneralError(res);
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((newItem) => res.status(201).send(newItem))
    .catch((err) => {
      handlePostError(err, res);
    });
};

module.exports.deleteItem = (req, res) => {
  const { id } = req.params;

  Item.findByIdAndDelete(id)
    .orFail(() => {
      throw new NotFoundError("Item was not found: invalid ID");
    })
    .then(() => res.status(204).send())
    .catch((err) => {
      handleIdError(err, res);
    });
};
