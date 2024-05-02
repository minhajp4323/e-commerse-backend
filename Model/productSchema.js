import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,

  imageUrl: String,
});

const productModel = mongoose.model("Product", ProductSchema)
export default productModel