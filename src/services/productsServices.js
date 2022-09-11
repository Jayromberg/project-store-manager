const { productsModel } = require('../models');
const { productNameValidation } = require('./validations/productValidation');

const getAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  if (products.length === 0) throw new Error('PRODUCT_NOT_FOUND');
  return products;
};

const getProductsByID = async (id) => {
  const product = await productsModel.findProductsById(id);
  if (product.length === 0) throw new Error('PRODUCT_NOT_FOUND');
  return product;
};

const insertProduct = async (newProduct) => {
  const { error } = productNameValidation(newProduct);
  
  if (error) return error;

  const { name } = newProduct;
  const { insertId } = await productsModel.InsertProduct(name);
  return { id: insertId, name };
};

module.exports = {
  getAllProducts,
  getProductsByID,
  insertProduct,
};
