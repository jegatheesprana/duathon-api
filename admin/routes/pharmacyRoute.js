const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController')

router.get('/', pharmacyController.getAllPharmacies);
router.get('/:pharmacyId', pharmacyController.getPharmacy);
// router.post('/', pharmacyController.createPharmacy);
// router.put('/:pharmacyId', pharmacyController.updatePharmacy);
router.put('/status/:pharmacyId', pharmacyController.changeStatus);
// router.delete('/:pharmacyId', pharmacyController.deletePharmacy);
// router.get("/byDistrict/:district", pharmacyController.getPharmacyByDistrict)

    module.exports = router;
