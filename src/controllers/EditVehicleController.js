const EditVehicleUseCase = require('../usecases/EditVehicleUseCase/EditVehicle.usecase')

class EditVehicleController {
    /**
     * Constructor of EditVehicleController
     * @param {*} vehicleRepository a vehicleRepository 
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(request, response) {
        let { vehicleid, standid, brandid, gastypeid, model, year, mileage, price, availability, description } = request.body  || {}
        if(!vehicleid || !standid || !brandid || !gastypeid || !model || !year || !mileage || !price || !availability || !description) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have vehicleid, standid, brandid, gastypeid, model, year, mileage, price, availability, description' })
        }

        const usecase = new EditVehicleUseCase(this.vehicleRepository)
        const vehicle = await usecase.execute({vehicleid, standid, brandid, gastypeid, model, year, mileage, price, availability, description})

        if(vehicle.error) {
            await LogService.execute({from: 'VehiclesService', data: vehicle.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: vehicle.error.message })
        }

        return response.status(200).json(vehicle.data)
    }
}

module.exports = EditVehicleController