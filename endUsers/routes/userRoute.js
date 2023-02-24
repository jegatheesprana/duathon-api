const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/me', userController.getMe)
router.put('/info', userController.updateInfo)
router.put('/password', userController.changePassword)

module.exports = router;