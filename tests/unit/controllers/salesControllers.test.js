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
  salesByIdReturned } = require('./mocks/salesControllersMocks');


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
    await salesController.findProductsByIdControllers(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesByIdReturned);
  });
});