const mongoose = require("mongoose");
const { Schema } = mongoose;
const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
