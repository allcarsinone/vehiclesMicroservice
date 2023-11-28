const DeleteGasTypeUseCase = require('../usecases/DeleteGasTypeUseCase/DeleteGasType.usecase')
const LogService = require('./services/LogService')

/**
 * @class DeleteGasTypeController
 * @description Controller of DeleteGasTypeUseCase
 * */
class DeleteGasTypeController {
    /**
     * @description Constructor of DeleteGasTypeController
     * @param {*} gasTypeRepository a gasTypeRepository
     */
    constructor (gasTypeRepository, logService) {
    this.gasTypeRepository = gasTypeRepository
    this.logService = this.logService
    }

    async execute(request, response) {
        let { id } = request.body || {}
        if(!id) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have id' })
        }

        const usecase = new DeleteGasTypeUseCase(this.gasTypeRepository)
        const gasType = await usecase.execute({id})

        if(gasType.error) {
            await LogService.execute({from: 'VehiclesService', data: gasType.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: gasType.error.message })
        }

        return response.status(204).json({})
    }

}

module.exports = DeleteGasTypeController