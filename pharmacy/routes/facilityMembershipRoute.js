const express = require('express');
const router = express.Router();
const facilityMembershipController = require("../controllers/facilityMembershipController")

router.get('/byPharmacy/:pharmacyId', facilityMembershipController.getAllFacilityMembershipsByPharmacy);
router.get('/byFacility/:facilityId', facilityMembershipController.getAllFacilityMembershipsByFacility);
router.get('/byPharmacy/byFacility/:pharmacyId/:facilityId', facilityMembershipController.getAllFacilityMembershipsByPharmacyAndFacility);
router.get('/byPharmacy/byFacilityCategory/:pharmacyId/:facilityCategoryId', facilityMembershipController.getAllFacilityMembershipsByPharmacyAndFacilityCategory);
router.get('/:membershipId', facilityMembershipController.findFacilityMembership)
router.post('/', facilityMembershipController.createFacilityMembership);
router.put('/update/:membershipId', facilityMembershipController.updateFacilityMembership);
router.delete('/:membershipId', facilityMembershipController.deleteFacilityMembership);

module.exports = router;