const Vehicle = require('../../entities/Vehicle')
const { Result, handleError } = require('../../util/Result')
const { json } = require('express')

class DeleteVehicleUseCase {
    /**
     * @description Constructor of DeleteVehicleUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(deleteVehicleDto) {
        const withErrorHandling = handleError(async () => {
            const vehicleExists = await this.vehicleRepository.findByID(deleteVehicleDto.vehicleid)

            if(!vehicleExists) {
                return Result.failed(new Error('Vehicle doesnt exists'))
            }

            const vehicle = await this.vehicleRepository.deleteVehicle(deleteVehicleDto.vehicleid)

            return Result.success(json({success: 'true'}))
        })

        return withErrorHandling()
    }
}

module.exports = DeleteVehicleUseCase