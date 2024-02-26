const mongoose = require("mongoose");
const bcrypt= require("bcrypt")
const User= require("./../Model/userSchema")
const {joiUserSchema} = require("./../Model/validateSchema")