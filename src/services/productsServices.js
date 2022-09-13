const { productsModel } = require('../models');
const { productNameValidation } = require('./validations/productValidation');

const findAllProductsServices = async () => {
  const products = await productsModel.findAllProductsModel();
  if (!products) throw new Error('INTERNAL_ERROR');
  return products;
};

const findProductsByIdServices = async (id) => {
  const product = await productsModel.findProductsByIdModel(id);
  if (product.length === 0) throw new Error('PRODUCT_NOT_FOUND');
  return product;
};

const insertProductServices = async (newProduct) => {
  const { error } = productNameValidation(newProduct);
  if (error) throw new Error(error.message);

  const { name } = newProduct;
  const { insertId } = await productsModel.insertProductModel(name);
  return { id: insertId, name };
};

const updateProductService = async (id, name) => {
  const { affectedRow } = await productsModel.updateProduct(id, name);

  if (affectedRow === 1) {
    const product = productsModel.findProductsByIdModel(id);
    return product;
  }
  
  return [];
};

module.exports = {
  findAllProductsServices,
  findProductsByIdServices,
  insertProductServices,
  updateProductService,
};
