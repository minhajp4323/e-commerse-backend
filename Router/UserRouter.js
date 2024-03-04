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
  .post("/addtocart/:id", tryCatch(controller.addToCart));

module.exports = server;
