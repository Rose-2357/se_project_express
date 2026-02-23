const mongoose = require("mongoose");
const { urlValidator } = require("../utils/validators");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  weather: {
    type: String,
    enum: ["hot", "warm", "cold"],
    required: [true, 'The "weather" field must be filled'],
  },
  imageUrl: {
    type: String,
    required: [true, 'The "imageUrl" field must be filled'],
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, 'The "owner" field must be filled'],
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
