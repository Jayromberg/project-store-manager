const Joi = require('joi');
const { productsModel } = require('../../models');

const salesValidation = (product) => {
  const schema = Joi.array().items({
    productId: Joi.number().required()
      .messages({
        'any.required': 'PRODUCT_ID_IS_REQUIRED',
      }),
    
    quantity: Joi.number().integer().positive().required()
      .messages({
        'number.positive': 'INVALID_QUANTITY',
        'any.required': 'QUANTITY_IS_REQUIRED',
      }),
  });

  return schema.validate(product);
};

const validateInputProductId = async (sales) => {
  let validate = true;

  const generatePromises = sales
    .map((sale) => productsModel.findProductsByIdModel(sale.productId));

  const products = await Promise.all(generatePromises);
  console.log(products);
  products.forEach(([product]) => {
    if (!product) {
      validate = false;
    }
  });

  return validate;
};

module.exports = {
  salesValidation,
  validateInputProductId,
};
