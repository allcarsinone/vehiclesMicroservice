const RegisterGasTypeUseCase = require('../usecases/RegisterGasTypeUseCase/RegisterGasType.usecase');

/**
 * @Class RegisterGasTypeController
 * @description Controller of RegisterGasType
 * */
class RegisterGasTypeController {

    constructor(gasTypeRepository, logService) {
        this.gasTypeRepository = gasTypeRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { name } = request.body

        if(!name) {
            await this.logService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have name' })
        }

        const usecase = new RegisterGasTypeUseCase(this.gasTypeRepository)
        const gasType = await usecase.execute({name})

        if(gasType.error) {
            await this.logService.execute({from: 'VehiclesService', data: gasType.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: gasType.error.message })
        }

        await this.logService.execute({from: 'VehiclesService', data: `GasType ${gasType.data.name} created`, date: new Date(), status: 'success'}, this.logService)
        return response.status(201).json(gasType.data)
    }
}

module.exports = RegisterGasTypeController