const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const productsControllers = require('../../../src/controllers/productsController');
const { productsServices } = require('../../../src/services');
const { servicesProductResponse,
  servicesProductResponseById,
  productNotFound,
  insertedProduct,
  errorInKeyName,
  errorInTheCharactersOfTheKeyName,
  genericError,
  responseUpdateMock } = require('./mocks/productsControllersMocks');

describe('Products Controllers', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Busca todos os produtos em estoque', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'findAllProductsServices').resolves(servicesProductResponse);
    await productsControllers.findAllProductsControllers(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponse);
  });

  it('Busca um produto em estoque pelo id', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'findProductsByIdServices').resolves(servicesProductResponseById);
    await productsControllers.findProductsByIdControllers(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponseById[0]);
  });

  it('Retorna erro se o id for invalido', async function () {
    // https://stackoverflow.com/questions/39387822/how-to-handle-sinon-stub-throws-in-unit-test-by-sinon-js
    const res = {};
    const req = { params: { id: 999999999 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'findProductsByIdServices').throws(productNotFound);
    await productsControllers.findProductsByIdControllers(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ "message": "Product not found" });
  });

  it('Retorna erro 500 genérico, caso ocorra um erro desconhecido', async function () {
    const res = {};
    const req = { params: {}, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'findAllProductsServices').throws(genericError);
    await productsControllers.findAllProductsControllers(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ "message": "Internal error" });
  });

  it('Adiciona um produto no banco de dados', async function () {
    const res = {};
    const req = { params: {}, body: { "name": "ProdutoX" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'insertProductServices').resolves(insertedProduct);
    await productsControllers.insertProductControllers(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertedProduct);
  });

  it('Retorna erro se o name não existir', async function () {
    const res = {};
    const req = { params: {}, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'insertProductServices').throws(errorInKeyName);
    await productsControllers.insertProductControllers(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ "message": "\"name\" is required" });
  });

  it('Retorna erro se o name possuir menos de 5 caracteres', async function () {
    const res = {};
    const req = { params: {}, body: { "name": "abcd"} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'insertProductServices').throws(errorInTheCharactersOfTheKeyName);
    await productsControllers.insertProductControllers(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ "message": "\"name\" length must be at least 5 characters long" });
  });

  it('Atualizar um produto', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { "name": "Martelo do Batman" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'updateProductService').resolves(responseUpdateMock);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseUpdateMock);
  })
});
