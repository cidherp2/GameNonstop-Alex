// Import the required modules

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Cart = require("./Cart");
const Games = require("./ownedGames");
const Favorites = require("./Favorites");
const Product = require("./Product");

// User schema definition using the new Schema constructor
const userSchema = new Schema(
  {
    // Define firstName field with type and validations
    username: {
      type: String,
      required: true, // Make this field requiered
      trim: true, // Trims whitespace from the email
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique in the database
      trim: true,
      lowercase: true, // Converts the email to lowercase
      match: [
        /^([a-zA-Z0-9_\.-]+)@([a-zA-Z\d\.-]+)\.([a-zA-Z]{2,})$/,
        "Please fill a valid email address",
      ], // Regex validation for email
    },
    password: {
      type: String,
      required: true,
      minlength: 5, // Set a minimum length for the password
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Favorites",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    games: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    // Convert documents to JSON including virtuals
    toJSON: {
      virtuals: true, // Include virtuals when document is converted to JSON
    },
    id: false, // Prevent mongoose from creating a virtual `id` field
  }
);

// Create a virtual property `gamesCount` that returns the number of games associated with the user
userSchema.virtual("gamesCount").get(function () {
  return this.games.length;
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Instance method to check if the provided password matches the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema definition
const User = model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
