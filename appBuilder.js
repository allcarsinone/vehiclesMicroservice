const express = require('express');
const router = require('./routes/VehicleRouter')
const RegisterBrandController = require('./controllers/RegisterBrandController')
const EditBrandController = require('./controllers/EditBrandController')
const DeleteBrandController = require('./controllers/DeleteBrandController')
const RegisterGasTypeController = require('./controllers/RegisterGasTypeController')
const EditGasTypeController = require('./controllers/EditGasTypeController')
const DeleteGasTypeController = require('./controllers/DeleteGasTypeController')
const RegisterVehicleController = require('./controllers/RegisterVehicleController')
const EditVehicleController = require('./controllers/EditVehicleController')
const DeleteVehicleController = require('./controllers/DeleteVehicleController')
const LogMockAdapter = require('./adapters/LogMockAdapter')
const MockAuthServiceAdapter = require('./adapters/MockAuthServiceAdapter')

function makeApp(brandRepository, gasTypeRepository, vehicleRepository,
    logAdapter = new LogMockAdapter(), authService = new MockAuthServiceAdapter()) {
    const app = express();
    app.use(express.json());
    app.set('RegisterBrandController', new RegisterBrandController(brandRepository, logAdapter));
    app.set('EditBrandController', new EditBrandController(brandRepository));
    app.set('DeleteBrandController', new DeleteBrandController(brandRepository));
    app.set('RegisterGasTypeController', new RegisterGasTypeController(gasTypeRepository, logAdapter));
    app.set('EditGasTypeController', new EditGasTypeController(gasTypeRepository));
    app.set('DeleteGasTypeController', new DeleteGasTypeController(gasTypeRepository));
    app.set('RegisterVehicleController', new RegisterVehicleController(vehicleRepository, logAdapter));
    app.set('EditVehicleController', new EditVehicleController(vehicleRepository));
    app.set('DeleteVehicleController', new DeleteVehicleController(vehicleRepository));
    app.set('LogAdapter', logAdapter) // Log adapter: ex: rabbitmq
    app.set('AuthAdapter', authService)
    app.use('/stands', router);
    return app;
}

module.exports = makeApp