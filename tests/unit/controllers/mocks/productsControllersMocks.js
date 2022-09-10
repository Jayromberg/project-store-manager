const servicesProductResponse = [
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

const servicesProductResponseById = [
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
];

const insertedProduct = {
  "id": 4,
  "name": "ProdutoX"
}

const productNotFound = new Error("Product not found");

module.exports = {
  servicesProductResponse,
  servicesProductResponseById,
  productNotFound,
  insertedProduct,
};