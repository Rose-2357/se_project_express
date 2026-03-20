const NotFoundError = require("../customError/NotFoundError");
const Item = require("../models/clothingitems");
const { ITEM_NOT_FOUND_ERROR_MESSAGE } = require("../utils/errorMessages");

const BadRequestError = require("../customError/BadRequestError");
const {
  handleIdError,
  handleValidationError,
} = require("../utils/errorHandlers");

module.exports.getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((newItem) => res.status(201).send(newItem))
    .catch((err) => handleValidationError(err, next));
};

module.exports.deleteItem = (req, res, next) => {
  const { id } = req.params;

  Item.findByIdAndDelete(id)
    .orFail(() => {
      throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then(() => res.status(200).send({ message: "Item was deleted" }))
    .catch((err) => handleIdError(err, next));
};

module.exports.likeItem = (req, res, next) => {
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
    .catch((err) => handleIdError(err, next));
};

module.exports.disLikeItem = (req, res, next) => {
  const { id } = req.params;

  Item.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError(ITEM_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((newItem) => res.send(newItem))
    .catch((err) => handleIdError(err, next));
};
