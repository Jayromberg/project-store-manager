const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');

describe('Sales Model', function () {
  it('INSERT Sales date', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await productsModel.insertDateOfSaleModel();
    expect(response).to.deep.equal({ insertId: 1 })
  });
  it('INSERT Sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const response = await productsModel.insertSalesModel();
    expect(response).to.deep.equal({ insertId: 1 })
  });
});