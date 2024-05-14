const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  stripePaymentIntentId: {
    type: String, // ID del Intento de Pago de Stripe
  },
  paymentDate: {
    type: Date, // Fecha en la que se realizó el pago
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
