const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../../middlewares/authMiddleware')

router.use('/auth', require('./authRoute'));

router.use(ensureAdmin)
router.use('/pharmacies', require('./pharmacyRoute'));
router.use('/medicines', require('./medicineRoute'));

module.exports = router;