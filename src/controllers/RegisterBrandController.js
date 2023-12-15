const RegisterBrandUseCase = require('../usecases/RegisterBrandUseCase/RegisterBrand.usecase');

class RegisterBrandController {

    /**
     * Constructor of RegisterBrandController
     * @param {*} brandRepository a brandRepository
     * @param {*} logService a logService
     */
    constructor(brandRepository, logService) {
        this.brandRepository = brandRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { name } = request.body

        if(!name) {
            await this.logService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have name' })
        }

        const usecase = new RegisterBrandUseCase(this.brandRepository)
        const brand = await usecase.execute({name})

        if(brand.error) {
            await this.logService.execute({from: 'VehiclesService', data: brand.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: brand.error.message })
        }

        await this.logService.execute({from: 'VehiclesService', data: `Brand ${brand.data.name} created`, date: new Date(), status: 'success'}, this.logService)
        return response.status(201).json(brand.data)
    }
}

module.exports = RegisterBrandController