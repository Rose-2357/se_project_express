const ForbiddenError = require("../customError/ForbiddenError");
const Item = require("../models/clothingItems");
const { FORBIDDEN_ERROR_CODE } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { id } = req.params;

  Item.findById(id)
    .orFail()
    .then((data) => {
      if (data.owner.toString() === req.user._id) {
        return next();
      }
      throw new ForbiddenError();
    })
    .catch((err) => {
      if (err.name === "ForbiddenError") {
        return res.status(FORBIDDEN_ERROR_CODE).send({ message: err.message });
      }
      next(); //other errors are handeled by the next methode
    });
};
