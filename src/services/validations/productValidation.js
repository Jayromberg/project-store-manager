const isProductIdExists = async (product) => {
  if (product.length === 0) throw new Error('PRODUCT_NOT_FOUND');
  return product;
};

module.exports = {
  isProductIdExists,
};