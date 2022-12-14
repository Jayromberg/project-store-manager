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

const productNotFound = new Error('PRODUCT_NOT_FOUND');

const genericError = new Error('LALALAND');

const errorInKeyName = new Error('NAME_IS_REQUIRED');

const errorInTheCharactersOfTheKeyName = new Error('INVALID_NAME');

const responseUpdateMock = {
  "id": 1,
  "name": "Martelo do Batman"
}

module.exports = {
  servicesProductResponse,
  servicesProductResponseById,
  productNotFound,
  insertedProduct,
  errorInKeyName,
  errorInTheCharactersOfTheKeyName,
  genericError,
  responseUpdateMock,
};