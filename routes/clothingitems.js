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

itemRouter.get("/items", getItems);

itemRouter.use("/items", auth);

itemRouter.post("/items", validateCardBody, createItem);

itemRouter.put("/items/:id/likes", validateId, likeItem);

itemRouter.delete("/items/:id/likes", validateId, disLikeItem);

itemRouter.use("/items/:id", athorizeItemOwner);

itemRouter.delete("/items/:id", validateId, deleteItem);

module.exports = itemRouter;
