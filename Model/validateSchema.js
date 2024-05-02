import Joi from "joi";

export const joiUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  phonenumber: Joi.number().min(10),
  password: Joi.string().min(1).required(),
});
export const joiProductSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  category: Joi.string(),
  price: Joi.number(),

  imageUrl: Joi.string(),
});
