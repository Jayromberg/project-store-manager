const { productsModel } = require('../models');

const getAllProducts = async () => {
  const result = await productsModel.findAllProducts();
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
};
