import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,

  imageUrl: String,
});

export default mongoose.model("Product", ProductSchema)