const productResponse = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const insertedProduct = {
  "id": 4,
  "name": "ProdutoX"
}

// const errorInKeyName = new Error('"name" is required');

// const errorInTheCharactersOfTheKeyName = new Error('"name" length must be at least 5 characters long');

module.exports = {
  productResponse,
  insertedProduct,
};