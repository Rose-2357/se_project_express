const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingitems");
const itemRouter = require("express").Router();

itemRouter.get("/items", getItems);

itemRouter.post("/items", createItem);

itemRouter.delete("/items/:id", deleteItem);

module.exports = itemRouter;
