const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./../Model/userSchema");
const { joiUserSchema } = require("./../Model/validateSchema");
const jwt = require("jsonwebtoken");

const Product = require("./../Model/productSchema");

module.exports = {
  userRegister: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);
    const { username, email, phonenumber, password } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (error) {
      res.status(400).json({
        status: error,
        message: `invalid user input, check the input`,
      });
    }
    const userData = await User.create({
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: hashedPassword,
    });

    res.status(200).json({
      status: "success",
      message: `Registration succefull`,
      data: userData,
    });
    console.log(userData);
  },
  userLogin: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);

    if (error) {
      res.json(error.message);
    }
    const { email, password } = value;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    if (!password || !user.password) {
      res.status(400).json({
        status: "error",
        message: "Invalid input",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        error: "error",
        message: "Incorrect password",
      });
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.USER_ACCESS_TOKEN
    );
    res.status(200).json({
      status: "success",
      message: "Logged in",
      Token: token,
    });
  },
};
