const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,

  imageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);
