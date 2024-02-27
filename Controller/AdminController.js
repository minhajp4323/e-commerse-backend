const mongoose = require("mongoose");
const Users = require("./../Model/userSchema");
const jwt = require("jsonwebtoken");
const { joiUserSchema } = require("./../Model/validateSchema");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { username: username },
        process.env.ADMIN_ACCESS_TOKEN
      );
      res.status(200).send({
        status: "success",
        message: "Admin logged in successfully",
        token: token,
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "Incorrect admin ID",
      });
    }
  },
  getAllUser: async (req, res) => {
    const allUser = Users.find();
    if (allUser.length === 0) {
      res.status(404).send({
        status: "error",
        message: "Users not found",
      });
    } else {
      res.status(200).send({
        status: "Success",
        message: "Fetched all the users",
        data: allUser,
      });
    }
  },
};
