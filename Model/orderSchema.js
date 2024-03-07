const { date } = require("joi");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
    date: { type: String, default: () => new Date().toLocaleDateString() },
    time: { type: String, default: () => new Date().toLocaleTimeString() },
    orderId: String,
    paymentId: String,
    totalAmount: Number,
  },
  { strictPopulate: false }
);

module.exports = mongoose.model("orders", orderSchema);
