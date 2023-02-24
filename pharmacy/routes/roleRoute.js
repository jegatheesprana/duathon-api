const express = require('express');
const router = express.Router();
const roleController = require("../controllers/roleController")

router.get('/', roleController.getAllRoles);
router.get('/:roleId', roleController.findRole)
router.post('/', roleController.createRole);
router.put('/update/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);
router.put('/status/:roleId', roleController.updateRoleStatus);

module.exports = router;