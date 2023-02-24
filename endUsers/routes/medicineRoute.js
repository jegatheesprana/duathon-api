const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController')

router.get('/', medicineController.getAllMedicines);

module.exports = router;