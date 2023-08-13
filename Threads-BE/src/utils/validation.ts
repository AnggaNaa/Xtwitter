import Joi = require("joi");

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  full_name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
