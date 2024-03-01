const Users = require("./../Model/userSchema");
const Products = require("./../Model/productSchema");
const jwt = require("jsonwebtoken");
const { joiProductSchema } = require("./../Model/validateSchema");
const { default: mongoose } = require("mongoose");

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
    const allUser = await Users.find();
    // console.log(allUser);
    if (allUser.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Users not found",
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Fetched all the users",
        data: allUser,
      });
    }
  },
  getUserById: async (req, res) => {
    const userID = req.params.id;
    const user = await Users.findById(userID);
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: "Succes",
        message: "Fetched user by id",
        data: user,
      });
    }
  },
  addProduct: async (req, res) => {
    const { value, error } = joiProductSchema.validate(req.body);
    const { name, category, price, imageUrl } = value;
    console.log(value);
    if (error) {
      res.status(400).send({
        status: "error",
        message: error,
      });
    } else {
      const addedProduct = await Products.create({
        name,
        category,
        price,
        imageUrl,
      });
      res.status(200).send({
        status: "Success",
        message: "Product added succesfully",
        data: addedProduct,
      });
    }
  },
  viewAllProduct: async (req, res) => {
    const viewAll = await Products.find();
    if (!viewAll) {
      res.status(404).send({
        status: "Error",
        message: "No products found",
      });
    } else {
      res.status(200).send({
        status: "Success",
        message: "All products are fetched",
        data: viewAll,
      });
    }
  },
  
  viewProductbyId: async (req, res) => {
    const prodId = req.params.id;
    const prod = await Products.findById(prodId);
    if (!prod) {
      res.status(404).send({
        status: "Error",
        message: "No products found",
      });
    } else {
      res.status(200).send({
        status: "Success",
        message: "Product fetched",
        data: prod,
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { id: productId } = req.params;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(404).send({
        status: "error",
        message: "Id is invalid",
      });
    }
    const deletedProduct = await Products.findOneAndDelete({
      _id: productId,
    });

    if (!deletedProduct) {
      res.status(404).send({
        status: "Error",
        message: "Can't find the pruduct",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Product deleted successfully",
    });
  },
  editProduct: async (req, res) => {
    const { value, error } = joiProductSchema.validate(req.body);
    const { id, name, category, price, imageUrl } = value;
    if (error) {
      res.status(404).send({
        error: "Error",
        message: "No products",
      });
    }
    const editedProduct = await Products.findByIdAndUpdate(
      id,
      { $set: { name, category, price, imageUrl } },
      { new: true }
    );
    console.log(editedProduct);

    if (editedProduct) {
      const updatedProduct = await Products.findById(id);
      return res.status(200).send({
        status: "Success",
        message: " Successfully updated product",
        data: updatedProduct,
      });
    } else {
      return res.status(404).send({
        error: "Error",
        message: "Product not found",
      });
    }
  },
  
};
