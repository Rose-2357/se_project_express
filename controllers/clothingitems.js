const NotFoundError = require("../customError/NotFoundError");
const Item = require("../models/clothingItems.js");
const {
  handleGeneralError,
  handlePostError,
  handleIdError,
} = require("../utils/errorHandlers");
const { ITEM_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      handleGeneralError(err, res);
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
      throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then(() => res.status(200).send({ message: "Item was deleted" }))
    .catch((err) => {
      handleIdError(err, res);
    });
};

module.exports.likeItem = (req, res) => {
  const { id } = req.params;

  Item.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((newItem) => res.send(newItem))
    .catch((err) => handleIdError(err, res));
};

module.exports.disLikeItem = (req, res) => {
  const { id } = req.params;

  Item.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((newItem) => res.send(newItem))
    .catch((err) => handleIdError(err, res));
};
