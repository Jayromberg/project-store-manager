const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { objectWithTheProductsSold,
  objectWithSalesReturned,
  objectWithNonExistentProduct,
  successfulDBRequest,
  objectWihMissingInput,
  saleDateSurveyResponse,
  saleSurveyResponse,
  salesDataMock,
  AllSalesDataMock } = require('./mocks/salesServiceMcks');

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

  it('Busca as vendas pelo id', async function () {
    sinon.stub(salesModel, 'findDateOfSalesByIdModel').resolves(saleDateSurveyResponse);
    sinon.stub(salesModel, 'findSalesByIdModel').resolves(saleSurveyResponse);

    const salesData = await salesService.findSalesByIdService(2);

    expect(salesData).to.deep.equal(salesDataMock);
  });

  it('Busca todas as vendas', async function () {
    sinon.stub(salesModel, 'findAllDateOfSalesModel').resolves(saleDateSurveyResponse);
    sinon.stub(salesModel, 'findAllSalesModel').resolves(saleSurveyResponse);

    const AllSalesData = await salesService.findAllSalesService();

    expect(AllSalesData).to.deep.equal(AllSalesDataMock);
  });
});