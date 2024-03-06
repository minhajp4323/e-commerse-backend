const express = require("express");
const controller = require("./../Controller/UserController");
const verifyToken = require("./../Middleware/userAuth");
const tryCatch = require("./../Middleware/ErrorHanlder");
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

module.exports = server;
