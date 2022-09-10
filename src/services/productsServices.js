const { productsModel } = require('../models');
const { isProductIdExists } = require('./validations/productValidation');

const getAllProducts = async () => {
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

const getProductsByID = async (id) => {
  const product = await productsModel.findProductsById(id);
  
  return isProductIdExists(product);
};

module.exports = {
  getAllProducts,
  getProductsByID,
};
