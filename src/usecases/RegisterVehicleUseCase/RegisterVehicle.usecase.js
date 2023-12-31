const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')
const crypto = require('crypto') 

class RegisterVehicleUseCase {
    /**
     * @description Constructor of RegisterVehicleUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(registerVehicleDto) {
        const withErrorHandling = handleError(async () => {
            /*const vehicleAlreadyExists = await this.vehicleRepository.findByID(registerVehicleDto.vehicleid)
            if (vehicleAlreadyExists) {
                return Result.failed(new Error('Vehicle already exists'))
            }*/

            let vehicle = Vehicle.create(registerVehicleDto)
            vehicle = await this.vehicleRepository.create(vehicle)

            return Result.success(vehicle.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = RegisterVehicleUseCase