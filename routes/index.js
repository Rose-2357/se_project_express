const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");
const userRouter = require("./user");

const router = require("express").Router();

router.use("/", userRouter);
router.all("*", (req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
