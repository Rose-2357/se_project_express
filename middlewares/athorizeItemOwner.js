const ForbiddenError = require("../customError/ForbiddenError");
const Item = require("../models/clothingitems");

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
        return next(new ForbiddenError());
      }
      return next(); // other errors are handeled by the next methode
    });
};
