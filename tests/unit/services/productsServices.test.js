const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const { productsServices } = require('../../../src/services');
const { productResponse, insertedProduct } = require('./mocks/productsServicesMocks');

describe('Products Services', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(productResponse);
    const products = await productsServices.getAllProducts();
    expect(products).to.deep.equal(productResponse);
  });

  it('Lista o produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findProductsById').resolves(productResponse[1]);
    const product = await productsServices.getProductsByID(2);
    expect(product).to.deep.equal(productResponse[1])
  });

  it('Produto não encontrado', async function () {
    sinon.stub(productsModel, 'findProductsById').resolves([]);
    try {
      await productsServices.getProductsByID(5)
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });

  it('Resultado da pesquisa de produtos não encontrada', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(undefined);
    try {
      await productsServices.getAllProducts();
    } catch (error) {
      expect(error.message).to.be.equal('INTERNAL_ERROR');
    }
  });

  it('Insere o produto no banco de dados', async function () {
    sinon.stub(productsModel, 'InsertProduct').resolves({ insertId: 4 });
    const product = await productsServices.insertProduct({ name: 'ProdutoX' });
    expect(product).to.deep.equal(insertedProduct);
  });

  it('Name não informado', async function() {
    sinon.stub(productsModel, 'InsertProduct').resolves(undefined);
    try {
      await productsServices.insertProduct({})
    } catch (error) {
      expect(error.message).to.be.equal('NAME_IS_REQUIRED');
    }
  });

  it('Name informado com menos de 5 caracteres', async function () {
    sinon.stub(productsModel, 'InsertProduct').resolves(undefined);
    try {
      await productsServices.insertProduct({ name: 'abcd'})
    } catch (error) {
      expect(error.message).to.be.equal('INVALID_NAME');
    }
  });
});