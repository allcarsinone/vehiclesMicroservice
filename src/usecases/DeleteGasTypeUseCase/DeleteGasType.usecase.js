const GasType = require('../../entities/GasType')
const { Result, handleError } = require('../../util/Result')
const { json } = require('express')

class DeleteGasTypeUseCase {
    /**
     * @description Constructor of DeleteGasTypeUseCase
     * @param {*} gasTypeRepository a gasTypeRepository
     */
    constructor (gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute(deleteGasTypeDto) {
        const withErrorHandling = handleError(async () => {
            const gasTypeExists = await this.gasTypeRepository.findByID(deleteGasTypeDto.id)

            if(!gasTypeExists) {
                return Result.failed(new Error('Gas type doesnt exists'))
            }

            const gastype = await this.gasTypeRepository.deleteGasType(deleteGasTypeDto.id)

            return Result.success(json({success: 'true'}))
        })

        return withErrorHandling()
    }

}

module.exports = DeleteGasTypeUseCase