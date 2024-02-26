require("dotenv").config();

const express = require("express");
const server = express();
const port = 3000;
const userRoute = require("./Router/UserRouter");
const adminRouter = require("./Router/AdminRouter");

server.use(express.json());
server.use("/api/users", userRoute);
server.use("/api/admin", adminRouter);

server.listen(port, (err) => {
  if (err) {
    console.error(`Something wrong in the server ${err}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
