const DeleteBrandUseCase = require('../usecases/DeleteBrandUseCase/DeleteBrand.usecase');

/**
 * @class DeleteBrandController
 * @description Controller of DeleteBrandUseCase
 * */

class DeleteBrandController {
    /**
     * @description Constructor of DeleteBrandController
     * @param {*} brandRepository a brandRepository
     * @param {*} logService a logService
     */
    constructor (brandRepository, logService) {
        this.brandRepository = brandRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { brandid } = request.params || {}
        if(!brandid) {
            await this.logService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have brandid' })
        }

        const usecase = new DeleteBrandUseCase(this.brandRepository)
        const brand = await usecase.execute({brandid})

        if(brand.error) {
            await this.logService.execute({from: 'VehiclesService', data: brand.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: brand.error.message })
        }

        await this.logService.execute({from: 'VehiclesService', data: `Brand deleted`, date: new Date(), status: 'success'}, this.logService)
        return response.status(204).json({})
    }
}

module.exports = DeleteBrandController