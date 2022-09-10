const { productsModel } = require('../models');

const getAllProducts = async () => {
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

const getProductsByID = async (id) => {
  const result = await productsModel.findProductsById(id);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductsByID,
};
