const DeleteBrandUseCase = require('../usecases/DeleteBrandUseCase/DeleteBrand.usecase');

/**
 * @class DeleteBrandController
 * @description Controller of DeleteBrandUseCase
 * */

class DeleteBrandController {
    /**
     * @description Constructor of DeleteBrandController
     * @param {*} brandRepository a brandRepository
     */
    constructor (brandRepository) {
        this.brandRepository = brandRepository
    }

    async execute(request, response) {
        let { brandid } = request.params || {}
        if(!brandid) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have brandid' })
        }

        const usecase = new DeleteBrandUseCase(this.brandRepository)
        const brand = await usecase.execute({brandid})

        if(brand.error) {
            await LogService.execute({from: 'VehiclesService', data: brand.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: brand.error.message })
        }

        return response.status(204).json({})
    }
}

module.exports = DeleteBrandController