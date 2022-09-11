import joi from 'joi';

export const wifiSchema = joi.object({
  title: joi.string().required(),
  networkName: joi.string().required(),
  password: joi.string().required()
});
