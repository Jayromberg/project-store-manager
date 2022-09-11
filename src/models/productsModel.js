const connection = require('./db/connection');

const findAllProductsModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return result;
};

const findProductsByIdModel = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products p WHERE p.id = ?;', [id],
  );

  return result;
};

const insertProductModel = async (productName) => {
  const [insertId] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [productName],
  );
  
  return insertId;
};

module.exports = {
  findAllProductsModel,
  findProductsByIdModel,
  insertProductModel,
};
