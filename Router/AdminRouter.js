
import express from "express"
import verifyAdminToken from "./../Middleware/adminAuth";
import tryCatch from "./../Middleware/ErrorHanlder";
import controller from "./../Middleware/"
import imageUpload from "../Middleware/imageUploader";
const server = express();


server.post("/login", tryCatch(controller.login));

server
  .use(verifyAdminToken)

  .get("/user", tryCatch(controller.getAllUser))
  .get("/user/:id", tryCatch(controller.getUserById))
  .post("/addproduct", imageUpload, tryCatch(controller.addProduct))
  .get("/allproducts", tryCatch(controller.viewAllProduct))
  .get("/viewOneproduct/:id", tryCatch(controller.viewProductbyId))
  .delete("/deleteproduct/:id", tryCatch(controller.deleteProduct))
  .put("/editproduct/:id", tryCatch(controller.editProduct))
  .get("/orderlist", tryCatch(controller.viewOrder))

module.exports = server;
