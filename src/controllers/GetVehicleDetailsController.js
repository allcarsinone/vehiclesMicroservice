const GetVehicleDetailsUseCase = require('../usecases/GetVehicleDetailsUseCase/GetVehicleDetails.usecase');
const LogService = require('./services/LogService');

/**
 * @Class GetVehicleDetailsController
 * @description Controller of GetVehicleDetails
 * */
class GetVehicleDetailsController {

    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { vehicleid } = request.body || {}

        vehicleid = parseInt(vehicleid)

        if(!vehicleid) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid' })
        }

        const usecase = new GetVehicleDetailsUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute(vehicleid)

        if(vehicle.error) {
            await LogService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        await LogService.execute({from: 'VehiclesService', data: `Get vehicle ${vehicle.data.id}`, date: new Date(), status: 'success'}, this.logService)
        return response.status(201).json(vehicle.data)
    }
}

module.exports = GetVehicleDetailsController