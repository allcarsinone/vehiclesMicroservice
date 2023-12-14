const GetVehicleDetailsUseCase = require('../usecases/GetVehicleDetailsUseCase/GetVehicleDetails.usecase');

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
        let { vehicleId } = request.params || {}

        vehicleId = parseInt(vehicleId)

        if(!vehicleId) {
            await this.logService.execute('VehiclesService', 'Missing fields', 'error')
            return response.status(400).json({ error: 'All fields are required. It should have vehicleId' })
        }

        const usecase = new GetVehicleDetailsUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute(vehicleId)

        if(vehicle.error) {
            await this.logService.execute('VehiclesService', vehicle.error.message, 'error')
            return response.status(400).json({ error: vehicle.error.message })
        }

        await this.logService.execute('VehiclesService', `Get vehicle ${vehicle.data.id}`,'success')
        return response.status(201).json(vehicle.data)
    }
}

module.exports = GetVehicleDetailsController