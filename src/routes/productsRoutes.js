const express = require('express');
const productsControllers = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', productsControllers.findProductsByIdControllers);
router.get('/', productsControllers.findAllProductsControllers);
router.post('/', productsControllers.insertProductControllers);

module.exports = router;
