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

module.exports = {
  insertDateOfSalesModel,
  insertSalesModel,
};
