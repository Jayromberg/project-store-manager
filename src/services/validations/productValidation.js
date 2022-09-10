const isProductIdExists = async (product) => {
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  isProductIdExists,
};