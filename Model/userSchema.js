const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
  cart: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.ObjectId, ref: "orders" }],
});

module.exports = mongoose.model("user", userSchema);
