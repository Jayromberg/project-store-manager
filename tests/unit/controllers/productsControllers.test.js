const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const productsControllers = require('../../../src/controllers/productsController');
const { productsServices } = require('../../../src/services');
const { servicesProductResponse, servicesProductResponseById, productNotFound } = require('./mocks/productsControllersMocks');

describe('Products Controllers', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Busca todos os produtos em estoque', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getAllProducts').resolves(servicesProductResponse);
    await productsControllers.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponse.message);
  });
  it('Busca um produto em estoque pelo id', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProductsByID').resolves(servicesProductResponseById);
    await productsControllers.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponseById.message[0]);
  });
  it('Retorna erro se o id for invalido', async function () {
    const res = {};
    const req = { params: { id: 999999999 }, body: {} };;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProductsByID').resolves(productNotFound);
    await productsControllers.getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: productNotFound.message });
  });
});
