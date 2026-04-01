const userRouter = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/user");
const auth = require("../middlewares/auth");
const { validateUserUpdateBody } = require("../middlewares/validation");

userRouter.use(auth);

userRouter.get("/me", getCurrentUser);

userRouter.patch("/me", validateUserUpdateBody, updateUser);

module.exports = userRouter;
