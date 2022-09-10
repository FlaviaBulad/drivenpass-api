import joi from 'joi';

export const registerSchema = joi.object({
  email: joi.string().trim().required(),
  password: joi.string().min(10).trim().required()
});

export const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().trim().required()
});
