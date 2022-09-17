const express = require('express');
const productsControllers = require('../controllers/productsController');

const router = express.Router();

router.get('/search', productsControllers.searchProductByNameController);
router.get('/:id', productsControllers.findProductsByIdControllers);
router.put('/:id', productsControllers.updateProductController);
router.delete('/:id', productsControllers.deleteProductController);
router.get('/', productsControllers.findAllProductsControllers);
router.post('/', productsControllers.insertProductControllers);

module.exports = router;
