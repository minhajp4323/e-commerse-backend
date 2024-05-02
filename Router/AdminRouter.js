import express from "express";
import verifyAdminToken from "./../Middleware/adminAuth.js";
import tryCatch from "./../Middleware/ErrorHanlder.js";
import { addProduct, deleteProduct, editProduct, getAllUser, getUserById, login, viewAllProduct, viewOrder, viewProductbyId } from "./../Controller/AdminController.js";
import imageUpload from "../Middleware/imageUploader.js";
const server = express();

server.post("/login", tryCatch(login));

server
  .use(verifyAdminToken)

  .get("/user", tryCatch(getAllUser))
  .get("/user/:id", tryCatch(getUserById))
  .post("/addproduct", imageUpload, tryCatch(addProduct))
  .get("/allproducts", tryCatch(viewAllProduct))
  .get("/viewOneproduct/:id", tryCatch(viewProductbyId))
  .delete("/deleteproduct/:id", tryCatch(deleteProduct))
  .put("/editproduct/:id", tryCatch(editProduct))
  .get("/orderlist", tryCatch(viewOrder));

export default  server;
