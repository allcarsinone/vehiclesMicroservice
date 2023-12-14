const Brand = require('../../entities/Brand')
const { Result, handleError } = require('../../util/Result')
const { json } = require('express')

class DeleteAllVehiclesByStandUseCase {
    /**
     * @description Constructor of DeleteAllVehiclesByStandUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute(standid) {
        const withErrorHandling = handleError(async () => {
            await this.vehicleRepository.deleteByStand(standid)
            return Result.success({success: true})
        })

        return withErrorHandling()
    }
}

module.exports = DeleteAllVehiclesByStandUseCase