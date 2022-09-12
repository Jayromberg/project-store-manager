const errorMap = {
  PRODUCT_NOT_FOUND: {
    code: 404,
    message: 'Product not found',
  },
  NAME_IS_REQUIRED: {
    code: 400,
    message: '"name" is required',
  },
  INVALID_NAME: {
    code: 422,
    message: '"name" length must be at least 5 characters long',
  },
  PRODUCT_ID_IS_REQUIRED: {
    code: 400,
    message: '"productId" is required',
  },
  QUANTITY_IS_REQUIRED: {
    code: 400,
    message: '"quantity" is required',
  },
  INVALID_QUANTITY: {
    code: 422,
    message: '"quantity" must be greater than or equal to 1',
  },
};

const mapError = (type) => errorMap[type] || { code: 500, message: 'Internal error' };

module.exports = mapError;