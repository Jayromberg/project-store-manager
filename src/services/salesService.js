const snakeize = require('snakeize');
const { salesModel } = require('../models');
const { salesValidation, validateInputProductId } = require('./validations/salesValidation');

const insertSalesService = async (sales) => {
  sales.forEach((sale) => {
    const { error } = salesValidation(sale);
    if (error) throw new Error(error.message);
  });
  
  const productIdValidation = await validateInputProductId(sales);
  if (!productIdValidation) throw new Error('PRODUCT_NOT_FOUND');
  
  const { insertId } = await salesModel.insertDateOfSalesModel();
  const generatePromises = sales
    .map((sale) => salesModel.insertSalesModel(insertId, snakeize(sale)));
  
  await Promise.all(generatePromises);
  
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  insertSalesService,
};
