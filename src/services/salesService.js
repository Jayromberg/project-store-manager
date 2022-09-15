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
  const dateSaleData = salesModel.findAllDateOfSalesModel();
  const salesData = salesModel.findAllSalesModel();
  const result = await Promise.all([dateSaleData, salesData]);
  const [date, sales] = camelize(result);
  const resultJoin = sales.map((sale) => {
    let newObj;
    date.forEach((dateInfo) => {
      if (sale.saleId === dateInfo.id) {
        newObj = {
          saleId: sale.saleId,
          date: dateInfo.date,
          ...sale,
        };
      }
    });
    return newObj;
  });
  return resultJoin;
};

const findSalesByIdService = async (id) => {
  const dateSaleData = salesModel.findDateOfSalesByIdModel(id);
  const salesData = salesModel.findSalesByIdModel(id);
  const result = await Promise.all([dateSaleData, salesData]);
  const [[date], sales] = camelize(result);

  if (!date) throw new Error('SALE_NOT_FOUND');
  
  const resultJoin = sales.map((sale) => {
    const newObj = {
          date: date.date,
          productId: sale.productId,
          quantity: sale.quantity,
        };
    return newObj;
  });

  return resultJoin;
};

const deleteSaleService = async (id) => {
  const { affectedRows } = await salesModel.deleteSale(id);

  if (affectedRows === 0) throw new Error('SALE_NOT_FOUND');

  return [];
};

const updateSalesService = async (id, sales) => {
  const [salesData] = await salesModel.findSalesByIdModel(id);
  if (!salesData) throw new Error('SALE_NOT_FOUND');

  const { error } = salesValidation(sales);
  if (error) throw new Error(error.message);

  const productIdValidation = await validateInputProductId(sales);
  if (!productIdValidation) throw new Error('PRODUCT_NOT_FOUND');

  const generatePromises = sales.map((sale) => salesModel.updateSales(id, snakeize(sale)));
  const resolves = await Promise.all(generatePromises);

  if (resolves.every((elem) => elem.affectedRows === 1)) {
    return {
      saleId: id,
      itemsUpdated: sales,
    };
  }
};

module.exports = {
  insertSalesService,
  findAllSalesService,
  findSalesByIdService,
  deleteSaleService,
  updateSalesService,
};
