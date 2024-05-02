import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express"
import userRoute from "./Router/UserRouter"
import adminRouter from "./Router/AdminRouter"
import bodyParser from "body-parser";
const server = express();

const port = 4000;
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
