const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("./../Middleware/adminAuth");
const server = express();
const tryCatch = require("./../Middleware/ErrorHanlder");
const controller = require("./../Controller/AdminController");

server
.post("/login", tryCatch(controller.login))
.get("/alluser", tryCatch, verifyToken(controller.getAllUser))


module.exports = server;
