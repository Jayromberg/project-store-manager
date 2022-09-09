const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { productsModel } = require('../../../src/models');
const productsMock = require('./mocks/productsModelsMock');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.productsMockFromDB]);
    const response = await productsModel.findAllProducts();
    expect(response).to.deep.equal(productsMock.productsMockFromDB);
  });

  it('Lista o produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.productsMockFromDB[1]]);

    const response = await productsModel.findAllProductsById(2);

    expect(response).to.deep.equal(productsMock.productsMockFromDB[1])
  });
});