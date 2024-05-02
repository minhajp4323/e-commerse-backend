import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "./../Model/userSchema";
import { joiUserSchema } from "./../Model/validateSchema";

import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import stripePackage from "stripe";

// Load environment variables from .env file
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);



import Product from "./../Model/productSchema";
import Order from "./../Model/orderSchema";

let sValue = [];

//register
export const userRegister = async (req, res) => {
  const { value, error } = joiUserSchema.validate(req.body);
  const { username, email, phonenumber, password } = value;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(value);
  if (error) {
    res.status(400).json({
      status: error,
      message: `invalid user input, check the input`,
    });
  }
  const existingUser = await User.findOne({
    username: username,
  });
  console.log(existingUser);
  if (existingUser) {
    res.status(400).json({
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
    status: "Success",
    message: "Registration succefull",
    data: userData,
  });
  console.log(userData);
};

//login
export const userLogin = async (req, res) => {
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
    // {
    //   expiresIn: 86400,
    // }
  );

  res.status(200).json({
    status: "success",
    message: "Logged in",
    Token: token,
  });
};

// view product list
export const viewProducts = async (req, res) => {
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
};

//sigle product
export const viewOneProduct = async (req, res) => {
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
};

//cart session
export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  console.log(user);

  if (!user) {
    return res
      .status(404)
      .send({ status: "Failed", message: "user not found" });
  }

  const { productId } = req.body;
  console.log(productId);

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
};

export const viewCart = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send({
      status: "Failed",
      message: "No user found",
    });
  }
  const cartItemId = user.cart;
  if (!cartItemId) {
    res.status(404).send({
      status: "error",
      message: "Cart empty",
    });
  }
  const cartItems = await Product.find({
    _id: { $in: cartItemId },
  });
  res.status(200).send({
    status: "Succes",
    message: "Items fetched successfully",
    data: cartItems,
  });
};
export const deleteCartProduct = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  if (!productId) {
    res.status(404).send({
      status: "Error",
      message: "Cart is empty",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send({
      status: "Error",
      message: "No user found",
    });
  }
  await User.updateOne({ _id: userId }, { $pull: { cart: productId } });
  res.status(200).send({
    status: "Success",
    message: "Suucessfully deleted cart item",
    data: productId,
  });
};
//wishlist

export const addToWishlist = async (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  if (!user) {
    res.status(404).send({
      status: "Error",
      message: "User not found",
    });
  }
  const { productId } = req.body;
  if (!productId) {
    res.status(404).send({
      status: "Failed",
      message: "Wishlist is empty",
    });
  }
  await User.updateOne({ _id: userId }, { $addToSet: { wishlist: productId } });

  res.status(200).send({
    status: "Success",
    message: "Successfully added to wishlist",
  });
};
export const viewWishlist = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).send({
      status: "failed",
      message: "No users found",
    });
  }
  const wishproductid = user.wishlist;
  if (!wishproductid) {
    res.status(404).send({
      status: "error",
      message: "Wishlist is empty",
    });
  }
  const whishlistItem = await Product.find({
    _id: { $in: wishproductid },
  });
  res.status(200).send({
    status: "Succes",
    message: "Successfully fetched the wishlist",
    data: whishlistItem,
  });
};
export const deleteWishlistProd = async (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  if (!user) {
    res.status(404).send({
      status: "Error",
      message: "user not found",
    });
  }
  const { productId } = req.body;
  if (!productId) {
    res.status(404).send({
      status: "error",
      message: "Wishlist is already empty",
    });
  }
  const deleteWishlist = await User.updateOne(
    { _id: userId },
    { $pull: { wishlist: productId } }
  );
  res.status(200).send({
    status: "Succes",
    message: "Successfully deleted item from wishlist",
    data: deleteWishlist,
  });
};
//payment
export const payment = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).populate("cart");

  if (!user) {
    res.status(404).send({
      status: "Error",
      message: "No user Found",
    });
  }
  const cartProduct = user.cart;
  if (!cartProduct) {
    res.status(404).send({
      status: "Error",
      message: "Cart is empty",
      data: [],
    });
  }
  console.log(cartProduct, "sdfghj");
  const lineItems = cartProduct.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:4000/api/users/payment",
  });
  if (!session) {
    res.send({
      status: "Failure",
      message: "Error on session side",
    });
  }
  sValue = {
    userId,
    user,
    session,
  };
  res.status(200).send({
    status: "Success",
    message: "Stripe payment session created",
    url: session.url,
  });
};
export const succes = async (req, res) => {
  const { userId, user, session } = sValue;

  console.log(user);

  const cartItems = user.cart;
  console.log(cartItems);

  const orders = await Order.create({
    userId: userId,
    products: cartItems.map((item) => new mongoose.Types.ObjectId(item._id)),
    orderId: session.id,
    paymentId: `demo ${Date.now()}`,
    total_Amount: session.amount_total / 100,
  });
  if (!orders) {
    res.status(404).send({
      status: "Error",
      message: "Error occured while ordering",
    });
  }
  const orderId = orders._id;
  const userUpdate = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { orders: orderId }, $set: { cart: [] } },
    { new: true }
  );
  console.log(userUpdate);
  if (userUpdate) {
    res.status(200).send({
      status: "Success",
      message: "Payment successfull",
    });
  } else {
    res.status(500).send({
      status: "Error",
      message: "Failed to update user data",
    });
  }
};
export const orderDetails = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("orders");

  if (!user) {
    res.status(404).send({
      status: "Error",
      message: "No users found",
    });
  }

  const orderProduct = user.orders;
  console.log(orderProduct, "HHHHHHHHHHHHHH");
  if (!orderProduct) {
    res.status(404).send({
      status: "error",
      message: "no orders for any product",
    });
  }

  const orderWithProduct = await Order.find({
    _id: { $in: orderProduct },
  }).populate("Product");
  if (orderWithProduct) {
    res.status(200).send({
      status: "Success",
      message: "Successfully fetched the order details",
      data: orderWithProduct,
    });
  }
  console.log(orderWithProduct);
};
