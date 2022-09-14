const express = require('express');
const productsControllers = require('../controllers/productsController');

const router = express.Router();

router.get('/:id', productsControllers.findProductsByIdControllers);
router.put('/:id', productsControllers.updateProductController);
router.get('/', productsControllers.findAllProductsControllers);
router.post('/', productsControllers.insertProductControllers);

module.exports = router;
