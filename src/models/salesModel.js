const connection = require('./db/connection');

const insertDateOfSalesModel = async () => {
  const [insertId] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES();',
  );
  return insertId;
};

const insertSalesModel = async (id, products) => {
  const columns = Object.keys(products)
    .map((key) => `${key}`)
    .join(', ');

  const placeholder = Object.keys(products)
    .map((_key) => '?')
    .join(', ');
  
  const [insertId] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholder})`,
    [id, ...Object.values(products)],
  );

  return insertId;
};

const findDateOfSalesByIdModel = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ? ;', [id],
  );

  return result;
};

const findSalesByIdModel = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ? ;', [id],
  );

  return result;
};

const findAllDateOfSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );

  return result;
};

const findAllSalesModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products;',
  );

  return result;
};

module.exports = {
  insertDateOfSalesModel,
  insertSalesModel,
  findDateOfSalesByIdModel,
  findSalesByIdModel,
  findAllDateOfSalesModel,
  findAllSalesModel,
};
