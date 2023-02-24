const express = require('express');
const router = express.Router();
const { ensureEmployee } = require('../../middlewares/authMiddleware')

router.use('/auth', require('./authRoute'));

// router.use(ensureEmployee)
router.use('/user', require('./userRoute'));
router.use('/pharmacies', require('./pharmacyRoute'));

module.exports = router;