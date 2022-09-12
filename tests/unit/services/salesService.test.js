const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { objectWithTheProductsSold,
  objectWithSalesReturned,
  objectWithNonExistentProduct,
  successfulDBRequest,
  objectWihMissingInput } = require('./mocks/salesServiceMcks');

describe('Sales Service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Insere as vendas no banco de dados', async function () {
    sinon.stub(salesModel, 'insertDateOfSalesModel').resolves({ insertId: 3 });
    sinon.stub(salesModel, 'insertSalesModel').resolves();
    sinon.stub(productsModel, 'findProductsByIdModel')
      .onFirstCall()
      .resolves(successfulDBRequest)
      .onSecondCall()
      .resolves(successfulDBRequest);
    
    const sales = await salesService.insertSalesService(objectWithTheProductsSold);
    expect(sales).to.deep.equal(objectWithSalesReturned);
  });

  it('ProductId invalido', async function () {
    try {
      sinon.stub(salesModel, 'insertDateOfSalesModel').resolves({ insertId: 3 });
      sinon.stub(salesModel, 'insertSalesModel').resolves();
      sinon.stub(productsModel, 'findProductsByIdModel')
        .onFirstCall()
        .resolves(successfulDBRequest)
        .onSecondCall()
        .resolves([]);
      
      await salesService.insertSalesService(objectWithNonExistentProduct);
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });

  it('ProductId inexistente', async function () {
    try {
      sinon.stub(salesModel, 'insertDateOfSalesModel').resolves({ insertId: 3 });
      sinon.stub(salesModel, 'insertSalesModel').resolves();
      sinon.stub(productsModel, 'findProductsByIdModel')
        .onFirstCall()
        .resolves(successfulDBRequest)
        .onSecondCall()
        .resolves(successfulDBRequest);
      
      await salesService.insertSalesService(objectWihMissingInput);
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_ID_IS_REQUIRED');
    }
  });
});