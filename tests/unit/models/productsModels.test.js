const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { productsModel } = require('../../../src/models');
const productsMock = require('./mocks/productsModelsMock');

describe('Products Model', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves(productsMock.productsMockFromDB);
  });
  afterEach(function () {
    sinon.restore;
  });
  it('com o tipo array', async function () {
    const response = await productsModel.findAllProducts();
    expect(response).to.be.a('array');
  });
  it('Lista todos os produtos', async function () {
    const response = await productsModel.findAllProducts();

    expect(response).to.deep.equal(productsMock.productsMockFromDB);
  });

  it('Lista o produto pelo id', function () {

  });
});