const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://alexlarios758:Km2bmap6JXOGkoD4@gamenonstop.45ctmcz.mongodb.net/?retryWrites=true&w=majority&appName=gamenonstop"
);

module.exports = mongoose.connection;
