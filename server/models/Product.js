const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
