const connection = require('./db/connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return result;
};

const findAllProductsById = () => [];

module.exports = {
  findAllProducts,
  findAllProductsById,
};
