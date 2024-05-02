import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
  cart: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.ObjectId, ref: "orders" }],
});

const userModel = mongoose.model("user", userSchema);

export default userModel