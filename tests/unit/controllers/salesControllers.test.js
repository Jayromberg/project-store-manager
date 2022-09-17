const chai = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/salesController');
const { salesService } = require('../../../src/services');
const { objectWithTheProductsSold,
  objectWithSalesReturned,
  errorInKeyProductId,
  allSalesReturned,
  salesByIdReturned,
  saleNotFound,
  genericError } = require('./mocks/salesControllersMocks');


describe('Sales Controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Adiciona à lista de produtos vendidos', async function () {
    const res = {};
    const req = { params: {}, body: { objectWithTheProductsSold } };;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insertSalesService').resolves(objectWithSalesReturned);
    await salesController.insertSalesController(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(objectWithSalesReturned);
  });

  it('Retorna erro caso produto invalido', async function () {
    const res = {};
    const req = { params: {}, body: { objectWithTheProductsSold } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insertSalesService').throws(errorInKeyProductId);
    await salesController.insertSalesController(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ "message": '"quantity" is required' });
  });

  it('Busca todos as vendas', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAllSalesService').resolves(allSalesReturned);
    await salesController.findAllSalesController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesReturned);
  });

  it('Busca a venda pelo id', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findSalesByIdService').resolves(salesByIdReturned);
    await salesController.findSaleByIdControllers(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdReturned);
  });

  it('Retorna erro 500 genérico, caso ocorra um erro desconhecido', async function () {
    const res = {};
    const req = { params: {}, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAllSalesService').throws(genericError);
    await salesController.findAllSalesController(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ "message": "Internal error" });
  });

  it('Retorna erro caso não tenha venda com o id informado', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findSalesByIdService').throws(saleNotFound);
    await salesController.findSaleByIdControllers(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ "message": "Sale not found" });
  });

  it('Retorna erro ao tentar deletar uma venda com id invalido', async function () {
    const res = {};
    const req = { params: { id: 999999999 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSaleService').throws(saleNotFound);
    await salesController.deleteSaleController(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ "message": "Sale not found" });
  });
  it('Verifica o status ao deletar um produto', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSaleService').resolves();
    await salesController.deleteSaleController(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('Atualizar uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 1 }, body: [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ]
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSalesService').resolves({
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
    await salesController.updateSalesController(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
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
  })

  it('Retorna erro ao tentar atualizar uma venda com id invalido', async function () {
    const res = {};
    const req = { params: { id: 999999999 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSalesService').throws(saleNotFound);
    await salesController.updateSalesController(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ "message": "Sale not found" });
  });
});