const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const { productsServices } = require('../../../src/services');
const { productResponse } = require('./mocks/productsServicesMocks');

describe('Products Services', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(productResponse);
    const products = await productsServices.getAllProducts();
    expect(products.message).to.deep.equal(productResponse);
  });

  it('Lista o produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findProductsById').resolves(productResponse[1]);

    const response = await productsServices.getProductsByID(2);

    expect(response.message).to.deep.equal(productResponse[1])
  });
});