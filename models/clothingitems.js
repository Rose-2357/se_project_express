const mongoose = require("mongoose");
const { urlValidator } = require("../utils/validators");
const validationMessages = require("../utils/validationMessages");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessages.NAME.REQUIRED],
    minlength: [2, validationMessages.NAME.MIN],
    maxlength: [30, validationMessages.NAME.MAX],
  },
  weather: {
    type: String,
    enum: {
      values: ["hot", "warm", "cold"],
      message: validationMessages.WEATHER.ENUM,
    },
    required: [true, validationMessages.WEATHER.REQUIRED],
  },
  imageUrl: {
    type: String,
    required: [true, validationMessages.IMAGE_URL.REQUIRED],
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, validationMessages.OWNER.REQUIRED],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
