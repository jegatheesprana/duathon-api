const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController')

router.get('/', inventoryController.getAllInventories);
router.get('/:pharmacyId', inventoryController.getInventory);
router.post('/', inventoryController.addInventory);
router.put('/:inventoryId', inventoryController.updateInventory);
router.put('/status/:inventoryId', inventoryController.changeStatus);
router.delete('/:inventoryId', inventoryController.deleteInventory);


module.exports = router;
