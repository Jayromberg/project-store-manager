const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const productsControllers = require('../../../src/controllers/productsController');
const { productsServices } = require('../../../src/services');
const { servicesProductResponse, productNotFound } = require('./mocks/productsControllersMocks');

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
  })
});
