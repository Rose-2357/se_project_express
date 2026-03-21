const userRouter = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateId,
  validateUserLoginBody,
  validateUserUpdateBody,
} = require("../middlewares/validation");

userRouter.post("/signup", validateUserBody, createUser);
userRouter.post("/signin", validateUserLoginBody, login);

userRouter.use(auth);

userRouter.get("/users/me", validateId, getCurrentUser);

userRouter.patch("/users/me", validateUserUpdateBody, updateUser);

module.exports = userRouter;
