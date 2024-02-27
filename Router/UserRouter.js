const express = require("express");
const controller = require("./../Controller/UserController");
const verifyToken = require("./../Middleware/userAuth");
const tryCatch = require("./../Middleware/ErrorHanlder");
const server = express.Router();

server.post("/register", tryCatch(controller.userRegister));
// server.post("/login", tryCatch, verifyToken(controller.userLogin))

module.exports = server;
