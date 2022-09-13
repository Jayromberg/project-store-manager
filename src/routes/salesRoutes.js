const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/:id', salesController.findSaleByIdControllers);
router.post('/', salesController.insertSalesController);
router.get('/', salesController.findAllSalesController);

module.exports = router;
