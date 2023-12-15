const DeleteVehicleUseCase = require('../usecases/DeleteVehicleUseCase/DeleteVehicle.usecase')

/**
 * @class DeleteVehicleController
 * @description Controller of DeleteVehicleUseCase
 * */
class DeleteVehicleController {
    /**
     * @description Constructor of DeleteVehicleController
     * @param {*} vehicleRepository a vehicleRepository
     * @param {*} logService a logService
     */
    constructor (vehicleRepository, logService) {
        this.vehicleRepository = vehicleRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { vehicleid } = request.params || {}
        if(!vehicleid) {
            await this.logService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid' })
        }

        const usecase = new DeleteVehicleUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute({vehicleid})

        if(vehicle.error) {
            await this.logService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }
        
        await this.logService.execute({from: 'VehiclesService', data: `Vehicled deleted`, date: new Date(), status: 'success'}, this.logService)
        return response.status(204).json({})
    }
}

module.exports = DeleteVehicleController