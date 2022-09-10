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
  insertedProduct } = require('./mocks/productsControllersMocks');

describe('Products Controllers', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Busca todos os produtos em estoque', async function () {
    const res = {};
    const req = {};
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getAllProducts').resolves(servicesProductResponse);
    await productsControllers.getAllProducts(req, res, next);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponse);
  });

  it('Busca um produto em estoque pelo id', async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProductsByID').resolves(servicesProductResponseById);
    await productsControllers.getProductsById(req, res, next);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(servicesProductResponseById[0]);
  });

  it('Retorna erro se o id for invalido', async function () {
    // https://stackoverflow.com/questions/39387822/how-to-handle-sinon-stub-throws-in-unit-test-by-sinon-js
    const res = {};
    const req = { params: { id: 999999999 }, body: {} };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'getProductsByID').throws(productNotFound);
    await productsControllers.getProductsById(req, res, next);
    expect(next).to.have.been.calledWith(productNotFound);
  });

  it('Adiciona um produto no banco de dados', async function () {
    const res = {};
    const req = { params: {}, body: { "name": "ProdutoX" } };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'insertProduct').resolves(insertedProduct);
    await productsControllers.addProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertedProduct);
  });
});
