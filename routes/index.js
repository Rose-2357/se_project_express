const router = require("express").Router();
const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");
const userRouter = require("./user");
const itemRouter = require("./clothingitems");

router.use("/", itemRouter);
router.use("/", userRouter);
router.all("*", (req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
