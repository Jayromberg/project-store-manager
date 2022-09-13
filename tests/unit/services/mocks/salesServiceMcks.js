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

const dateSearchResponseById = [
  {
    id: 2,
    date: '2022-09-12 15:09:17',
  }
];

const saleSearchAnswerById = [
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

const saleDateSurveyResponse = [
  {
    id: 2,
    date: '2022-09-12 15:09:17',
  },
  {
    id: 3,
    date: '2022-09-12 15:09:30',
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
  },
  {
    sale_id: 3,
    product_id: 2,
    quantity: 10,
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
  },
  {
    "saleId": 3,
    "date": "2022-09-12 15:09:30",
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
  dateSearchResponseById,
  saleSearchAnswerById,
};
