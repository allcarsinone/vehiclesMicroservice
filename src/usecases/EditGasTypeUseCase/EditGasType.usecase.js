const GasType = require('../../entities/GasType')
const { Result, handleError } = require('../../util/Result')

class EditGasTypeUseCase {
    /**
     * @description Constructor of EditGasTypeUseCase
     * @param {*} gasTypeRepository a gasTypeRepository
     */
    constructor (gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute(editGasTypeDto) {
        const withErrorHandling = handleError(async () => {
            const gasTypeExists = await this.gasTypeRepository.findByID(editGasTypeDto.id)
            if(!gasTypeExists) {
                return Result.failed(new Error('Gas type doesnt exists'))
            }
            gasTypeExists.editGasType(editGasTypeDto)
            let gastype = await this.gasTypeRepository.editGasType(gasTypeExists)
            return Result.success(gastype.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = EditGasTypeUseCase