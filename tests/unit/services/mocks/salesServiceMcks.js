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

const saleDateSurveyResponse = [
  {
    id: 2,
    date: '2022-09-12 15:09:17',
  }
];

const saleSurveyResponse = [
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
  },
  {
    sale_id: 2,
    product_id: 2,
    quantity: 10,
  }
];

const salesDataMock = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const AllSalesDataMock = [
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
  }
];

module.exports = {
  objectWithTheProductsSold,
  objectWithSalesReturned,
  objectWithNonExistentProduct,
  successfulDBRequest,
  objectWihMissingInput,
  saleDateSurveyResponse,
  saleSurveyResponse,
  salesDataMock,
  AllSalesDataMock,
};
