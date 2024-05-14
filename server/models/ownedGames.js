const mongoose = require("mongoose");

const { Schema } = mongoose;

const gamesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownedGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Games = mongoose.model("Games", gamesSchema);

module.exports = Games;
