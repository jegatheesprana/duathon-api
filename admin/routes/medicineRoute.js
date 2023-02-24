const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController')

router.get('/', medicineController.getAllMedicines);
router.get('/:medicineId', medicineController.getMedicine);
router.post('/', medicineController.createMedicine);
router.put('/:medicineId', medicineController.updateMedicine);
router.put('/status/:medicineId', medicineController.changeStatus);
router.delete('/:medicineId', medicineController.deleteMedicine);

module.exports = router;