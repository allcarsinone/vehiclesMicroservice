const GetVehiclesUseCase = require('../usecases/GetVehicleDetailsUseCase/GetVehicleDetails.usecase')

/**
 * @Class GetVehiclesController
 * @description Controller of GetVehicles
 * */
class GetVehiclesController {

    constructor(vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {

        const usecase = new GetVehiclesUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute()

        if(vehicle.error) {
            await LogService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        await LogService.execute({from: 'VehiclesService', data: `Get vehicles.`, date: new Date(), status: 'success'}, this.logService)
        return response.status(201).json(vehicle.data)
    }
}

module.exports = GetVehiclesController