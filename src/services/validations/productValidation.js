const isProductIdExists = async (product) => {
  if (product.length === 0) throw new Error('PRODUCT_NOT_FOUND');
  return { type: null, message: product };
};

module.exports = {
  isProductIdExists,
};