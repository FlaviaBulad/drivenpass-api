import joi from 'joi';
import { CardTypes } from '@prisma/client';

export const cardSchema = joi.object({
  title: joi.string().required(),
  cardHolderName: joi.string().required(),
  number: joi
    .string()
    .pattern(/^[0-9]{16}$/)
    .required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  expirationDate: joi.string().required(),
  password: joi.string().required(),
  type: joi.string().valid(CardTypes).required()
});
