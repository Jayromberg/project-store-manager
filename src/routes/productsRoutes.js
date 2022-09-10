const express = require('express');
const productsControllers = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);
router.post('/', productsControllers.addProduct);
router.get('/:id', productsControllers.getProductsById);

module.exports = router;
