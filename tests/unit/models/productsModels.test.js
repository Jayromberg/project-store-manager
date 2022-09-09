const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { productsModel } = require('../../../src/models');

describe('Products Model', function () {
  afterEach(async function () {
    sinon.restore();
  })
  it('Lista todos os produtos', function () {

  });

  it('Lista o produto pelo id', function () {

  });
});