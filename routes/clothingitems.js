const itemRouter = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingitems");
const athorizeItemOwner = require("../middlewares/athorizeItemOwner");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

itemRouter.get("/", getItems);

itemRouter.use("/", auth);

itemRouter.post("/", validateCardBody, createItem);

itemRouter.put("/:id/likes", validateId, likeItem);

itemRouter.delete("/:id/likes", validateId, disLikeItem);

itemRouter.use("/:id", athorizeItemOwner);

itemRouter.delete("/:id", validateId, deleteItem);

module.exports = itemRouter;
