const express = require('express');
const router = express.Router();
const departmentController = require("../controllers/departmentController")

router.get('/', departmentController.getAllDepartments);
router.get('/:departmentId', departmentController.findDepartment)
router.post('/', departmentController.createDepartment);
router.put('/update/:departmentId', departmentController.updateDepartment);
router.delete('/:departmentId', departmentController.deleteDepartment);

module.exports = router;