const { productsServices } = require('../services');
const mapError = require('../utils/mapError');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsServices.getAllProducts();
  if (type) return res.status(mapError(type)).json(message);
  res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductsByID(id);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message[0]);
};

module.exports = {
  getAllProducts,
  getProductsById,
};
