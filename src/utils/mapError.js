const errorMap = {
  PRODUCT_NOT_FOUND: {
    code: 404,
    message: 'Product not found',
  },
};

const mapError = (type) => errorMap[type] || { code: 500, message: 'Internal error' };

module.exports = mapError;