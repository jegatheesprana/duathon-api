const express = require('express');
const router = express.Router();
const { ensureEmployee } = require('../../middlewares/authMiddleware')

router.use('/auth', require('./authRoute'));

router.use(ensureEmployee)
router.use('/employees', require('./employeeRoute'));
router.use('/roles', require('./roleRoute'));
router.use('/user', require('./userRoute'));
router.use('/buildings', require('./buildingRoute'));
router.use('/pharmacys', require('./pharmacyRoute'));
router.use('/floors', require('./floorRoute'));
router.use('/departments', require('./departmentRoute'));
router.use('/resources', require('./resourceRoute'));
router.use('/facilityCategories', require('./facilityCategoryRoute'));
router.use('/facilities', require('./facilityRoute'));
router.use('/facilityMembership', require('./facilityMembershipRoute'));
router.use('/customers', require('./customerRoute'));

module.exports = router;