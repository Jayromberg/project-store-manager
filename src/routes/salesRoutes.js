const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/:id', salesController.findSaleByIdControllers);
router.delete('/:id', salesController.deleteSaleController);
router.put('/:id', salesController.updateSalesController);
router.post('/', salesController.insertSalesController);
router.get('/', salesController.findAllSalesController);

module.exports = router;
