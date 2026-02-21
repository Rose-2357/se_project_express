const itemRouter = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingItems");
const athorizeItemOwner = require("../middlewares/athorizeItemOwner");
const auth = require("../middlewares/auth");

itemRouter.get("/items", getItems);

itemRouter.use("/items", auth);

itemRouter.post("/items", createItem);

itemRouter.put("/items/:id/likes", likeItem);

itemRouter.delete("/items/:id/likes", disLikeItem);

itemRouter.use("/items/:id", athorizeItemOwner);

itemRouter.delete("/items/:id", deleteItem);

module.exports = itemRouter;
