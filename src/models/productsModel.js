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

const updateProduct = async (id, { name }) => {
  const [update] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ? ;',
    [name, id],
  );

  return update;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  
  return result;
};

module.exports = {
  findAllProductsModel,
  findProductsByIdModel,
  insertProductModel,
  updateProduct,
  deleteProduct,
};
