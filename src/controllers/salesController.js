const { salesService } = require('../services');
const mapError = require('../utils/mapError');

const insertSalesController = async (req, res) => {
  try {
    const newSales = req.body;
    const response = await salesService.insertSalesService(newSales);
    res.status(201).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  insertSalesController,
};
