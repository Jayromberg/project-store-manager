const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const { productsServices } = require('../../../src/services');
const { productResponse,
  insertedProduct,
  responseUpdateMock } = require('./mocks/productsServicesMocks');

describe('Products Services', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAllProductsModel').resolves(productResponse);
    const products = await productsServices.findAllProductsServices();
    expect(products).to.deep.equal(productResponse);
  });

  it('Lista o produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findProductsByIdModel').resolves(productResponse[1]);
    const product = await productsServices.findProductsByIdServices(2);
    expect(product).to.deep.equal(productResponse[1])
  });

  it('Produto não encontrado', async function () {
    sinon.stub(productsModel, 'findProductsByIdModel').resolves([]);
    try {
      await productsServices.findProductsByIdServices(5)
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });

  it('Resultado da pesquisa de produtos não encontrada', async function () {
    sinon.stub(productsModel, 'findAllProductsModel').resolves(undefined);
    try {
      await productsServices.findAllProductsServices();
    } catch (error) {
      expect(error.message).to.be.equal('INTERNAL_ERROR');
    }
  });

  it('Insere o produto no banco de dados', async function () {
    sinon.stub(productsModel, 'insertProductModel').resolves({ insertId: 4 });
    const product = await productsServices.insertProductServices({ name: 'ProdutoX' });
    expect(product).to.deep.equal(insertedProduct);
  });

  it('Name não informado', async function() {
    sinon.stub(productsModel, 'insertProductModel').resolves(undefined);
    try {
      await productsServices.insertProductServices({})
    } catch (error) {
      expect(error.message).to.be.equal('NAME_IS_REQUIRED');
    }
  });

  it('Name informado com menos de 5 caracteres', async function () {
    sinon.stub(productsModel, 'insertProductModel').resolves(undefined);
    try {
      await productsServices.insertProductServices({ name: 'abcd'})
    } catch (error) {
      expect(error.message).to.be.equal('INVALID_NAME');
    }
  });

  it('update do product', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves({ affectedRows: 1 });
    sinon.stub(productsModel, 'findProductsByIdModel').resolves([responseUpdateMock]);
    const response = await productsServices.updateProductService(1 , { "name":"Martelo do Batman" });
    expect(response).to.deep.equal(responseUpdateMock);
  });

  it('Produto não encontrado ao atualizar', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves({ affectedRows: 0 });
    sinon.stub(productsModel, 'findProductsByIdModel').resolves([]);
    try {
      await productsServices.updateProductService(99999999, { "name": "Martelo do Batman" });
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });

  it('Name não informado ao atualizar', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves({ affectedRows: 0 });
    sinon.stub(productsModel, 'findProductsByIdModel').resolves([]);
    try {
      await productsServices.updateProductService(1, {});
    } catch (error) {
      expect(error.message).to.be.equal('NAME_IS_REQUIRED');
    }
  });

  it('deletar um produto', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves({ affectedRows: 1 });
    const response = await productsServices.deleteProductService(1);
    expect(response).to.deep.equal([]);
  });

  it('Produto não encontrado ao deletar', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves({ affectedRows: 0 });
    try {
      await productsServices.deleteProductService(1);
    } catch (error) {
      expect(error.message).to.be.equal('PRODUCT_NOT_FOUND');
    }
  });
});
