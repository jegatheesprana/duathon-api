const express = require('express');
const router = express.Router();
const floorController = require('../controllers/floorController')

router.get('/:floorId', floorController.getFloor);
router.get('/byBuilding/:buildingId', floorController.getAllFloorByBuilding);
router.post('/:buildingId', floorController.createFloor);
router.put('/:floorId', floorController.updateFloor);
router.put('/status/:floorId', floorController.changeFloorStatus);
router.delete('/:floorId', floorController.deleteFloor);

module.exports = router;