const userRouter = require("express").Router();
const {createUser, login } = require("../controllers/user");

userRouter.post("/signup", createUser);
userRouter.post("/signin", login);

module.exports = userRouter;
