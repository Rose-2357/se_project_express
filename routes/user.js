const userRouter = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

userRouter.post("/signup", createUser);
userRouter.post("/signin", login);

userRouter.use(auth);

userRouter.get("/users/me", getCurrentUser);

userRouter.patch("/users/me", updateUser);

module.exports = userRouter;
