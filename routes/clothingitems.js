const itemRouter = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../controllers/clothingitems");

itemRouter.get("/items", getItems);

itemRouter.post("/items", createItem);

itemRouter.delete("/items/:id", deleteItem);

itemRouter.put("/items/:id/likes", likeItem);

itemRouter.delete("/items/:id/likes", disLikeItem);

module.exports = itemRouter;
