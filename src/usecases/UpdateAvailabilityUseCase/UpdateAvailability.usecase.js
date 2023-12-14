const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')
const crypto = require('crypto') 

class UpdateAvailabilityUseCase {
    /**
     * @description Constructor of UpdateAvailabilityUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(vehicleid) {
        const withErrorHandling = handleError(async () => {
            const vehicleAlreadyExists = await this.vehicleRepository.findByID(vehicleid)
            if (!vehicleAlreadyExists) {
                return Result.failed(new Error('Vehicle already exists'))
            }

            vehicleAlreadyExists.availability = !vehicleAlreadyExists.availability;

            const vehicle = await this.vehicleRepository.editVehicle(vehicleAlreadyExists)

            return Result.success(vehicle.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = UpdateAvailabilityUseCase