const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController')

router.get('/', pharmacyController.getAllPharmacies);
router.get('/:pharmacyId', pharmacyController.getPharmacy);
router.post('/', pharmacyController.createPharmacy);
router.put('/:pharmacyId', pharmacyController.updatePharmacy);
router.put('/status/:pharmacyId', pharmacyController.changeStatus);
router.delete('/:pharmacyId', pharmacyController.deletePharmacy);
// router.get("/byBuilding/:buildingId", pharmacyController.getPharmacyByBuilding),
// router.get("/byFloor/:floorId", pharmacyController.getPharmacyByFloor),
// router.put("/owner/:pharmacyId", pharmacyController.updatePharmacyOwner),

    module.exports = router;
