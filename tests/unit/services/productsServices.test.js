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
    const product = await productsServices.getProductsByID(2);
    expect(product.message).to.deep.equal(productResponse[1])
  });

  it('Produto não encontrado', async function () {
    sinon.stub(productsModel, 'findProductsById').resolves([]);
    const product = await productsServices.getProductsByID(5);
    expect(product.message).to.be.equal('Product not found');
    expect(product.type).to.be.equal('NOT_FOUND');
  });
});