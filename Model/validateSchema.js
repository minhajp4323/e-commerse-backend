const joi = require("joi");

const joiUserSchema = joi.object({
  username: joi.string(),
  email: joi.string().email(),
  phonenumber: joi.number().min(10),
  password: joi.string().min(8).required(),
});
module.exports = joiUserSchema;
