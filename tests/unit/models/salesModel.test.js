const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { salesModel } = require('../../../src/models');
const { id, objectWithSalesInformation } = require('./mocks/salesModelMocks');

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
});