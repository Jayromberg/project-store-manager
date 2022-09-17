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
  AllSalesDataMock,
  dateSearchResponseById,
  saleSearchAnswerById } = require('./mocks/salesServiceMcks');

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
    sinon.stub(salesModel, 'findDateOfSalesByIdModel').resolves(dateSearchResponseById);
    sinon.stub(salesModel, 'findSalesByIdModel').resolves(saleSearchAnswerById);
    const salesData = await salesService.findSalesByIdService(2);
    expect(salesData).to.deep.equal(salesDataMock);
  });

  it('Busca todas as vendas', async function () {
    sinon.stub(salesModel, 'findAllDateOfSalesModel').resolves(saleDateSurveyResponse);
    sinon.stub(salesModel, 'findAllSalesModel').resolves(saleSurveyResponse);
    const AllSalesData = await salesService.findAllSalesService();
    expect(AllSalesData).to.deep.equal(AllSalesDataMock);
  });

  it('Retorna erro caso não exista venda com o id consultado', async function () {
    try {
      sinon.stub(salesModel, 'findDateOfSalesByIdModel').resolves([]);
      sinon.stub(salesModel, 'findSalesByIdModel').resolves([]);
      await salesService.findSalesByIdService(2);
    } catch (error) {
      expect(error.message).to.be.equal('SALE_NOT_FOUND');
    }
  });

  it('deletar uma venda', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 1 });
    const response = await salesService.deleteSaleService(1);
    expect(response).to.deep.equal([]);
  });

  it('Venda não encontrado ao deletar', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 0 });
    try {
      await salesService.deleteSaleService(1);
    } catch (error) {
      expect(error.message).to.be.equal('SALE_NOT_FOUND');
    }
  });

  it('update do sales', async function () {
    sinon.stub(salesModel, 'updateSales').resolves({ affectedRows: 1 });
    const response = await salesService.updateSalesService(1, [
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 2,
        "quantity": 50
      }
    ]);
    expect(response).to.deep.equal({
      "saleId": 1,
      "itemsUpdated": [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]
    });
  });

  it('Venda não encontrado ao atualizar', async function () {
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([]);
    try {
      await salesService.updateSalesService(1, []);
    } catch (error) {
      expect(error.message).to.be.equal('SALE_NOT_FOUND');
    }
  });

  it('ProductId inexistente ao atualizar', async function () {
    try {
      sinon.stub(salesModel, 'updateSales')
        .onFirstCall()
        .resolves({ insertId: 1 })
        .onSecondCall()
        .resolves({ insertId: 1 });
      sinon.stub(productsModel, 'findProductsByIdModel')
        .onFirstCall()
        .resolves(successfulDBRequest)
        .onSecondCall()
        .resolves(successfulDBRequest);

      await salesService.updateSalesService(1, [
        {
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]);
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_ID_IS_REQUIRED');
    }
  });

  it('Produto não encontrado ao atualizar', async function () {
    try {
      sinon.stub(salesModel, 'updateSales')
        .onFirstCall()
        .resolves({ insertId: 1 })
        .onSecondCall()
        .resolves({ insertId: 1 });
      sinon.stub(productsModel, 'findProductsByIdModel')
        .onFirstCall()
        .resolves(successfulDBRequest)
        .onSecondCall()
        .resolves([]);

      await salesService.updateSalesService(1, [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]);
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });
});