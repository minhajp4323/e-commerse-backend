const joi = require("joi");

const joiUserSchema = joi.object({
  username: joi.string(),
  email: joi.string().email(),
  phonenumber: joi.number().min(10),
  password: joi.string().min(8).required(),
});
const joiProductSchema = joi.object({
  id:joi.string(),
  name: joi.string(),
  category: joi.string(),
  price: joi.number(),
  
  imageUrl: joi.string(),
});
module.exports = { joiUserSchema , joiProductSchema};
