const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { salesModel } = require('../../../src/models');
const { id,
  objectWithSalesInformation,
  saleDateSurveyResponse,
  saleSurveyResponse } = require('./mocks/salesModelMocks');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('INSERT Sales date', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await salesModel.insertDateOfSalesModel();
    expect(response).to.deep.equal({ insertId: 1 })
  });
  
  it('INSERT Sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await salesModel.insertSalesModel(id, objectWithSalesInformation);
    expect(response).to.deep.equal({ insertId: 1 })
  });

  it('Lista a data da venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleDateSurveyResponse]);
    const response = await salesModel.findDateOfSalesByIdModel(2);
    expect(response).to.deep.equal(saleDateSurveyResponse)
  });

  it('Lista a venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleSurveyResponse]);
    const response = await salesModel.findSalesByIdModel(2);
    expect(response).to.deep.equal(saleSurveyResponse)
  });
});