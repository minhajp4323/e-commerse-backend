import express from "express";
import { addToCart, addToWishlist, deleteCartProduct, deleteWishlistProd, orderDetails, payment, succes, userLogin, userRegister, viewCart, viewOneProduct, viewProducts, viewWishlist } from "./../Controller/UserController.js";
import verifyToken from "./../Middleware/userAuth.js";
import tryCatch from "./../Middleware/ErrorHanlder.js";
const server = express.Router();

server
  .post("/register", tryCatch(userRegister))
  .post("/login", tryCatch(userLogin))
  .use(verifyToken)
  .get("/allproduct", tryCatch(viewProducts))
  .get("/oneprod/:id", tryCatch(viewOneProduct))
  .post("/addtocart/:id", tryCatch(addToCart))
  .get("/viewcart/:id", tryCatch(viewCart))
  .delete("/deletecartprod/:id", tryCatch(deleteCartProduct))
  .post("/addtowishlist/:id", tryCatch(addToWishlist))
  .get("/viewwishlist/:id", tryCatch(viewWishlist))
  .delete("/deletewishlist/:id", tryCatch(deleteWishlistProd))
  .post("/:id/payment", tryCatch(payment))
  .post("/paymentsucces", tryCatch(succes))
  .get("/:id/orderdetails", tryCatch(orderDetails));

export default server;
