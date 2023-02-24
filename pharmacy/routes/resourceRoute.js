const express = require('express');
const router = express.Router();
const resourceController = require("../controllers/resourceController")

router.get('/', resourceController.getAllResources);
router.get('/:resourceId', resourceController.findResource)
router.post('/', resourceController.createResource);
router.put('/update/:resourceId', resourceController.updateResource);
router.put('/status/:resourceId', resourceController.changeStatus);
router.delete('/:resourceId', resourceController.deleteResource);

module.exports = router;