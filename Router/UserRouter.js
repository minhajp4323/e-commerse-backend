

import express from "express"
import controller from "./../Controller/UserController";
import verifyToken from "./../Middleware/userAuth";
import tryCatch from "./../Middleware/ErrorHanlder";
const server = express.Router();


server
  .post("/register", tryCatch(controller.userRegister))
  .post("/login", tryCatch(controller.userLogin))
  .use(verifyToken)
  .get("/allproduct", tryCatch(controller.viewProducts))
  .get("/oneprod/:id", tryCatch(controller.viewOneProduct))
  .post("/addtocart/:id", tryCatch(controller.addToCart))
  .get("/viewcart/:id", tryCatch(controller.viewCart))
  .delete("/deletecartprod/:id", tryCatch(controller.deleteCartProduct))
  .post("/addtowishlist/:id", tryCatch(controller.addToWishlist))
  .get("/viewwishlist/:id", tryCatch(controller.viewWishlist))
  .delete("/deletewishlist/:id", tryCatch(controller.deleteWishlistProd))
  .post("/:id/payment", tryCatch(controller.payment))
  .post("/paymentsucces", tryCatch(controller.success))
  .get("/:id/orderdetails", tryCatch(controller.orderDetails))

module.exports = server;
