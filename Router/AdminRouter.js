const express = require("express");
const verifyToken = require("./../Middleware/adminAuth");
const server = express();
const tryCatch = require("./../Middleware/ErrorHanlder");
const controller = require("./../Controller/AdminController");

const imageUpload = require("../Middleware/imageUploader");

server.post("/login", tryCatch(controller.login));

server
  .use(verifyToken)

  .get("/user", tryCatch(controller.getAllUser))
  .get("/user/:id", tryCatch(controller.getUserById))
  .post("/addproduct", imageUpload, tryCatch(controller.addProduct))
  .get("/allproducts", tryCatch(controller.viewAllProduct))
  .get("/viewOneproduct/:id", tryCatch(controller.viewProductbyId))
  .delete("/deleteproduct/:id", tryCatch(controller.deleteProduct))
  .put("/editproduct/:id", tryCatch(controller.editProduct))

module.exports = server;
