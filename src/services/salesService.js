const snakeize = require('snakeize');
const { salesModel } = require('../models');

const insertSalesService = async (sales) => {
  const { insertId } = await salesModel.insertDateOfSalesModel();
  const generatePromises = sales
    .map(async (sale) => {
      await salesModel.insertSalesModel(insertId, snakeize(sale));
    });
  await Promise.all(generatePromises);
  
  return { id: insertId, itemsSold: sales };
};

module.exports = {
  insertSalesService,
};
