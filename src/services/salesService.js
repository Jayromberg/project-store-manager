const snakeize = require('snakeize');
const camelize = require('camelize');

const { salesModel } = require('../models');
const { salesValidation, validateInputProductId } = require('./validations/salesValidation');

const insertSalesService = async (sales) => {
  const { error } = salesValidation(sales);
  if (error) throw new Error(error.message);

  const productIdValidation = await validateInputProductId(sales);
  if (!productIdValidation) throw new Error('PRODUCT_NOT_FOUND');

  const { insertId } = await salesModel.insertDateOfSalesModel();
  const generatePromises = sales
    .map((sale) => salesModel.insertSalesModel(insertId, snakeize(sale)));

  await Promise.all(generatePromises);

  return { id: insertId, itemsSold: sales };
};

const findAllSalesService = async () => {
  const DateSaleData = salesModel.findAllDateOfSalesModel();
  const salesData = salesModel.findAllSalesModel();
  const result = await Promise.all([DateSaleData, salesData]);
  const [data1, data2] = camelize(result);
  const resultJoin = data2.map((sales) => {
    let newObj;
    data1.forEach((dateInfo) => {
      if (sales.saleId === dateInfo.id) {
        newObj = {
          saleId: sales.saleId,
          date: dateInfo.date,
          ...sales,
        };
      }
    });
    return newObj;
  });
  return resultJoin;
};

module.exports = {
  insertSalesService,
  findAllSalesService,
};
