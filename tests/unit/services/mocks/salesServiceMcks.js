const objectWithTheProductsSold = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const objectWithSalesReturned = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const objectWithNonExistentProduct = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 5,
    "quantity": 5
  }
]

const successfulDBRequest = [{
  id: 1,
  name: 'lalaland'
}];

const objectWihMissingInput = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "quantity": 5,
  }
]

module.exports = {
  objectWithTheProductsSold,
  objectWithSalesReturned,
  objectWithNonExistentProduct,
  successfulDBRequest,
  objectWihMissingInput,
};
