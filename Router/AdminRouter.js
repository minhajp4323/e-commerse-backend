const express = require("express");
const verifyToken = require("./../Middleware/adminAuth");
const server = express();
const tryCatch = require("./../Middleware/ErrorHanlder");
const controller = require("./../Controller/AdminController");

server
.post("/login", tryCatch(controller.login))

server.use(verifyToken)

.get("/user", tryCatch(controller.getAllUser))
.get("/user/:id", tryCatch(controller.getUserById))


module.exports = server;
