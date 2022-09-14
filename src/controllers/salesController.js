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

const findAllSalesController = async (_req, res) => {
  try {
    const response = await salesService.findAllSalesService();
    res.status(200).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const findSaleByIdControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await salesService.findSalesByIdService(id);
    res.status(200).json(response);
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

const deleteSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    await salesService.deleteSaleService(id);
    res.status(204).end();
  } catch (error) {
    const err = mapError(error.message);
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  insertSalesController,
  findAllSalesController,
  findSaleByIdControllers,
  deleteSaleController,
};
