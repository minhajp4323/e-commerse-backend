const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./../Model/userSchema");
const { joiUserSchema } = require("./../Model/validateSchema");
const jwt = require("jsonwebtoken");

const Product = require("./../Model/productSchema");

module.exports = {
  //register
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
    const existingUser = await User.find({
      username: username,
    });
    if (existingUser) {
      res.status(400).send({
        status: "error",
        message: "Username already taken",
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
      message: "Registration succefull",
      data: userData,
    });
    console.log(userData);
  },

  //login
  userLogin: async (req, res) => {
    const { value, error } = joiUserSchema.validate(req.body);

    if (error) {
      res.json(error.message);
    }
    const { username, password } = value;
    const user = await User.findOne({
      username: username,
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

  // view product list
  viewProducts: async (req, res) => {
    const prods = await Product.find();
    if (!prods) {
      res.status(404).send({
        status: "Error",
        message: "No products found",
      });
    } else {
      res.status(200).send({
        status: "Success",
        message: "Products fetched successfully",
        data: prods,
      });
    }
  },

  //sigle product
  viewOneProduct: async (req, res) => {
    const prodId = req.params.id;
    const prod = await Product.findById(prodId);

    if (!prod) {
      res.status(404).send({
        status: "Error",
        message: "Error fetching the product",
      });
    } else {
      res.status(200).send({
        status: "Success",
        message: "Successfully fetched the product",
        data: prod,
      });
    }
  },

  //cart session
  addToCart: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log(user, "pooooo");

    if (!user) {
      return res
        .status(404)
        .send({ status: "failed", message: "user not found" });
    }

    const { productId } = req.body;
    console.log("dfg", productId);

    if (!productId) {
      return res
        .status(404)
        .send({ status: "failed", message: "product not found" });
    }
    await User.updateOne({ _id: userId }, { $addToSet: { cart: productId } });
    res.status(200).send({
      status: "success",
      message: "successfully product was added to cart",
    });
  },

  viewCart: async(req, res)=>{
    const userId= req.params.id
    const user= User.findById(userId)
  }
  // deleteCartProduct: async (req, res) => {
  //   const user = User.params.id;
  //   const userId= 
  // },
};
