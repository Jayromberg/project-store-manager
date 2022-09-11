const Joi = require('joi');

const productNameValidation = (product) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(30)
      .required()
      .messages({
        'string.min': 'INVALID_NAME',
        'any.required': 'NAME_IS_REQUIRED',
      }),
  }).length(1);

  return schema.validate(product);
};

module.exports = {
  productNameValidation,
};