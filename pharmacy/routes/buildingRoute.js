const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController')

router.get('/', buildingController.getAllBuildings);
router.get('/:buildingId', buildingController.getBuilding);
router.post('/', buildingController.createBuilding);
router.put('/:buildingId', buildingController.updateBuilding);
router.put('/status/:buildingId', buildingController.changeStatus);
router.delete('/:buildingId', buildingController.deleteBuilding);

// router.get('/floors/:floorId', buildingController.getFloor);
// router.get('/floors/:buildingId', buildingController.getAllFloorByBuilding);
// router.post('/floors/:buildingId', buildingController.createFloor);
// router.put('/floors/:floorId', buildingController.updateFloor);
// router.put('/floors/status/:floorId', buildingController.changeStatus);
// router.delete('/floors/:floorId', buildingController.deleteFloor);

module.exports = router;