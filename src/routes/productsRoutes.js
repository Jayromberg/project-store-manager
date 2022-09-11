const express = require('express');
const productsControllers = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsControllers.findAllProductsControllers);
router.post('/', productsControllers.insertProductControllers);
router.get('/:id', productsControllers.findProductsByIdControllers);

module.exports = router;
