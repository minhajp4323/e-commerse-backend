const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  phonenumber: Number,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
