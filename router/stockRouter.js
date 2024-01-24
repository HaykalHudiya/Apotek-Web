const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.post('/', stockController.createStock);
router.get('/', stockController.getAllStocks);
router.get('/:id', stockController.getStockById);
router.put('/:id', stockController.updateStockById);
router.delete('/:id', stockController.deleteStockById);

module.exports = router;