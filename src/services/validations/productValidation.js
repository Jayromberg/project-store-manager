const isProductIdExists = async (product) => {
  if (product.length === 0) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  isProductIdExists,
};