const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')

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
            const brandAlreadyExists = await this.vehicleRepository.findByID(registerVehicleDto.vehicleid)
            if (brandAlreadyExists) {
                return Result.failed(new Error('The brand already exists'))
            }

            const id = crypto.randomUUID()
            let vehicle = Vehicle.create(registerVehicleDto.stand, registerVehicleDto.brand, registerVehicleDto.gastype, registerVehicleDto.model,
                registerVehicleDto.year, registerVehicleDto.mileage, registerVehicleDto.price, registerVehicleDto.availability, registerVehicleDto.description, id)
            vehicle = await this.vehicleRepository.create(vehicle)

            return Result.success(vehicle.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = RegisterVehicleUseCase