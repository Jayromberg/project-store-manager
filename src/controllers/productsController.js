const { productsServices } = require('../services');
const mapError = require('../utils/mapError');

const getAllProducts = async (_req, res) => {
  try {   
    const result = await productsServices.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.getProductsByID(id);
    res.status(200).json(result[0]);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const response = await productsServices.insertProduct(newProduct);
    res.status(201).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  addProduct,
};
