import Joi from 'joi';

const createBookValidation = Joi.object({
  code: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  stock: Joi.number().required(),
});

const getBookValidation = Joi.number().required();

const getCodeBookValidation = Joi.string().required();

export { createBookValidation, getBookValidation, getCodeBookValidation };
