require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const port = 4000;
const userRoute = require("./Router/UserRouter");
const adminRouter = require("./Router/AdminRouter");
const server = express();
const bodyParser = require("body-parser");

// mongoose.connect("mongodb://localhost:27017/backend-ecom");
const mongodb = "mongodb://127.0.0.1:27017/Backend";

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(mongodb);
  console.log("db connected");
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.json());

server.use("/api/users", userRoute);
server.use("/api/admin", adminRouter)

server.listen(port, (err) => {
  if (err) {
    console.error(`Something wrong in the server ${err}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
