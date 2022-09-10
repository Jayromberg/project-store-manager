const servicesProductResponse = {
  type: null,
  message: [{
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
  }]
};

const servicesProductResponseById = {
  type: null,
  message: [
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  ]
};

const productNotFound = new Error("Product not found");;

module.exports = {
  servicesProductResponse,
  servicesProductResponseById,
  productNotFound,
};