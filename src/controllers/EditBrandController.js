const EditBrandUseCase = require('../usecases/EditBrandUseCase/EditBrand.usecase')

/**
 * @class EditBrandController
 * @description Controller of EditBrandUseCase
 */
class EditBrandController {
    /**
     * @description Constructor of EditBrandController
     * @param {*} brandRepository a brandRepository
     * @param {*} logService a logService
     */
    constructor (brandRepository, logService) {
        this.brandRepository = brandRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { brandid, name } = request.body || {}

        if(!brandid || !name) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have brandid, name' })
        }

        const usecase = new EditBrandUseCase(this.brandRepository)
        const brand = await usecase.execute({brandid, name})

        if(brand.error) {
            await LogService.execute({from: 'VehiclesService', data: brand.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: brand.error.message })
        }

        await LogService.execute({from: 'VehiclesService', data: `Brand ${brand.data.name} edited`, date: new Date(), status: 'success'}, this.logService)
        return response.status(200).json(brand.data)
    }
}

module.exports = EditBrandController