const DeleteVehicleUseCase = require('../usecases/DeleteVehicleUseCase/DeleteVehicle.usecase')

/**
 * @class DeleteVehicleController
 * @description Controller of DeleteVehicleUseCase
 * */
class DeleteVehicleController {
    /**
     * @description Constructor of DeleteVehicleController
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(request, response) {
        let { vehicleid } = request.params || {}
        if(!vehicleid) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid' })
        }

        const usecase = new DeleteVehicleUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute({vehicleid})

        if(vehicle.error) {
            await LogService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        return response.status(204).json({})
    }
}

module.exports = DeleteVehicleController