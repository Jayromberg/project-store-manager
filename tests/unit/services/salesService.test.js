const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { objectWithTheProductsSold, objectWithSalesReturned } = require('./mocks/salesServiceMcks');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Insere as vendas no banco de dados', async function () {
    sinon.stub(salesModel, 'insertDateOfSalesModel').resolves({ insertId: 3 });
    sinon.stub(salesModel, 'insertSalesModel').resolves();
    const sales = await salesService.insertSalesService(objectWithTheProductsSold);
    expect(sales).to.deep.equal(objectWithSalesReturned);
  });
});