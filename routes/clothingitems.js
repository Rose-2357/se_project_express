const itemRouter = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingitems");

itemRouter.get("/items", getItems);

itemRouter.post("/items", createItem);

itemRouter.delete("/items/:id", deleteItem);

module.exports = itemRouter;
