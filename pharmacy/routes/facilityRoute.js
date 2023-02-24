const express = require('express');
const router = express.Router();
const facilityController = require("../controllers/facilityController")

router.get('/byBuilding/:buildingId', facilityController.getAllFacilitiesByBuilding);
router.get('/byFloor/:floorId', facilityController.getAllFacilitiesByFloor);
router.get('/:facilityId', facilityController.getFacilityById);
router.post('/:buildingId', facilityController.createFacility);
router.put('/update/:facilityId', facilityController.updateFacility);
router.delete('/:facilityId', facilityController.deleteFacility);

module.exports = router;