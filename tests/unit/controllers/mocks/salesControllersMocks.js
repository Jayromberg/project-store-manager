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

const errorInKeyProductId = new Error('QUANTITY_IS_REQUIRED');

const allSalesReturned = [
  {
    "saleId": 2,
    "date": "2022-09-12 15:09:17",
    "productId": 3,
    "quantity": 15
  },
  {
    "saleId": 2,
    "date": "2022-09-12 15:09:17",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 3,
    "date": "2022-09-12 15:09:30",
    "productId": 2,
    "quantity": 10
  }
];

const salesByIdReturned = [
  {
    "date": "2022-09-12 15:09:17",
    "productId": 3,
    "quantity": 15
  },
  {
    "date": "2022-09-12 15:09:17",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  objectWithTheProductsSold,
  objectWithSalesReturned,
  errorInKeyProductId,
  allSalesReturned,
  salesByIdReturned,
};
