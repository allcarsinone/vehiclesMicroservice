const DeleteGasTypeUseCase = require('../usecases/DeleteGasTypeUseCase/DeleteGasType.usecase')

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
    this.logService = logService
    }

    async execute(request, response) {
        let { gastypeid } = request.params || {}
        if(!gastypeid) {
            await this.logService.execute({from: 'VehiclesService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have gastypeid' })
        }

        const usecase = new DeleteGasTypeUseCase(this.gasTypeRepository)
        const gasType = await usecase.execute({gastypeid})

        if(gasType.error) {
            await this.logService.execute({from: 'VehiclesService', data: gasType.error.message, date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: gasType.error.message })
        }

        await this.logService.execute({from: 'VehiclesService', data: `Gas Type deleted`, date: new Date(), status: 'success'}, this.logService)
        return response.status(204).json({})
    }

}

module.exports = DeleteGasTypeController