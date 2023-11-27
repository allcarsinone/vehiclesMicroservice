//const LogService = require('../services/LogService');
const RegisterVehicleUseCase = require('../usecases/RegisterVehicleUseCase/RegisterVehicle.usecase');

/**
 * @Class RegisterVehicleController
 * @description Controller of RegisterVehicle
 */
class RegisterVehicleController {
    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        //this.logService = logService
    }

    async execute(request, response) {
        let { standid, brandid, gastypeid, model, year, mileage, price, availability, description } = request.body

        if(!standid || !vehicleid || !brandid || !gastypeid || !model || !year || !mileage || !price || !availability || !description) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have standid, brandid, gastypeid, model, year, mileage, price, availability, description' })
        }

        const usecase = new RegisterVehicleUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute({standid, brandid, gastypeid, model, year, mileage, price, availability, description})

        if(vehicle.error) {
            await LogService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        await LogService.execute({from: 'VehiclesService', data: `Vehicle ${vehicle.data.model} created`, date: new Date(), status: 'success'}, this.logService)
        return response.status(201).json(vehicle.data)
    }
}

module.exports = RegisterVehicleController