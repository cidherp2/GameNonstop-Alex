const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  orderProducts: [
    {
      name: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      category: {
        type: String,
      },
    },
  ],
  total: {
    type: Number,
  },
  paymentDone: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
