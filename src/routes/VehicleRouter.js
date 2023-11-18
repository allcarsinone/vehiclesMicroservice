const VehicleController = require('../controllers/VehicleController');
const router = require('express').Router();

const vehicleController = new VehicleController();

router.post('/register', vehicleController.registerVehicle);

module.exports = router;