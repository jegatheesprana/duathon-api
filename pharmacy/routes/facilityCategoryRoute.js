const express = require('express');
const router = express.Router();
const facilityCategoryController = require("../controllers/facilityCategoryController")

router.get('/', facilityCategoryController.getAllFacilityCategories);
router.get('/:facilityCategoryId', facilityCategoryController.findFacilityCategory)
router.post('/', facilityCategoryController.createFacilityCategory);
router.put('/update/:facilityCategoryId', facilityCategoryController.updateFacilityCategory);
router.delete('/:facilityCategoryId', facilityCategoryController.deleteFacilityCategory);

module.exports = router;