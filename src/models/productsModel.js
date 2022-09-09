const connection = require('./db/connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return result;
};

const findAllProductsById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products p WHERE p.id = ?;', [id],
  );

  return result;
};

module.exports = {
  findAllProducts,
  findAllProductsById,
};
