const { productsServices } = require('../services');
const mapError = require('../utils/mapError');

const findAllProductsControllers = async (_req, res) => {
  try {   
    const result = await productsServices.findAllProductsServices();
    res.status(200).json(result);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const findProductsByIdControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.findProductsByIdServices(id);
    res.status(200).json(result[0]);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const insertProductControllers = async (req, res) => {
  try {
    const newProduct = req.body;
    const response = await productsServices.insertProductServices(newProduct);
    res.status(201).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await productsServices.updateProductService(id, name);
    res.status(200).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  findAllProductsControllers,
  findProductsByIdControllers,
  insertProductControllers,
  updateProductController,
};
