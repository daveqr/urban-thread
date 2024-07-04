import Joi from "joi";

export const userSchema = Joi.object({
  uuid: Joi.string().guid({ version: "uuidv4" }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fname: Joi.string().required(),
  lname: Joi.string().required(),
});
