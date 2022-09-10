const { productsServices } = require('../services');

const getAllProducts = async (_req, res, next) => {
  try {   
    const { message } = await productsServices.getAllProducts();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = await productsServices.getProductsByID(id);
    res.status(200).json(message[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
};
