const express = require('express');
const router = express.Router();
const { ensureEmployee } = require('../../middlewares/authMiddleware')

router.use('/auth', require('./authRoute'));

// router.use(ensureEmployee)
router.use('/user', require('./userRoute'));
router.use('/pharmacys', require('./pharmacyRoute'));
router.use('/medicines', require('./medicineRoute'));
router.use('/inventories', require('./inventoryRoute'));

module.exports = router;