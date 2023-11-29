const EditGasTypeUseCase = require('../usecases/EditGasTypeUseCase/EditGasType.usecase')
const LogService = require('./services/LogService')

/**
 * @class EditGasTypeController
 * @description Controller of EditGasTypeUseCase
 */
class EditGasTypeController {
    /**
     * @description Constructor of EditGasTypeController
     * @param {*} gasTypeRepository a gasTypeRepository
     * @param {*} logService a logService
     */
    constructor (gasTypeRepository, logService) {
        this.gasTypeRepository = gasTypeRepository
        this.logService = logService
    }

    async execute(request, response) {
        let { id, name } = request.body || {}

        if(!id || !name) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have gastypeid, name' })
        }

        const usecase = new EditGasTypeUseCase(this.gasTypeRepository)
        const gasType = await usecase.execute({id, name})

        if(gasType.error) {
            await LogService.execute({from: 'VehiclesService', data: gasType.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: gasType.error.message })
        }

        await LogService.execute({from: 'VehiclesService', data: `Gas ${gasType.data.name} edited`, date: new Date(), status: 'success'}, this.logService)
        return response.status(200).json(gasType.data)
    }
}

module.exports = EditGasTypeController