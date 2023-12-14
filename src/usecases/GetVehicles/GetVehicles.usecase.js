const { request } = require('express');
const { Result, handleError } = require('../../util/Result')

class GetVehiclesUseCase {
    /**
     * @description Constructor of GetVehiclesUseCase
     * @param {*} vehicleRepository a vehicleRepository
     */
    constructor (vehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async execute() {
        const withErrorHandling = handleError(async () => {
            if(request.user.body.role_id != 1) {
                vehicles = await this.vehicleRepository.findByStand(request.user.body.id);
            } else {
                vehicles = await this.vehicleRepository.getVehicles();
            }
        if (!vehicles) {
            return Result.failed(new Error('No vehicles found'));
        }

        return Result.success(vehicles);
        });

        return withErrorHandling();
    }
}

module.exports = GetVehiclesUseCase