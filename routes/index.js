const router = require("express").Router();
const userRouter = require("./user");
const itemRouter = require("./clothingitems");
const NotFoundError = require("../customError/NotFoundError");
const {
  validateUserBody,
  validateUserLoginBody,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/user");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUserLoginBody, login);
router.use("/items", itemRouter);
router.use("/users", userRouter);
router.all("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
