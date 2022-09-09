const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { productsModel } = require('../../../src/models');
const { productsMockFromDB } = require('./mocks/productsModelsMocks');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMockFromDB]);
    const response = await productsModel.findAllProducts();
    expect(response).to.deep.equal(productsMockFromDB);
  });

  it('Lista o produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([productsMockFromDB[1]]);

    const response = await productsModel.findProductsById(2);

    expect(response).to.deep.equal(productsMockFromDB[1])
  });
});