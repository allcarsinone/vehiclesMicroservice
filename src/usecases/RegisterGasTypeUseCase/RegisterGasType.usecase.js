const GasType = require('../../entities/GasType')
const { Result, handleError } = require('../../util/Result')

class RegisterGasTypeUseCase {
    /**
     * @description Constructor of RegisterGasTypeUseCase
     * @param {*} gasTypeRepository a gasTypeRepository
     */
    constructor (gasTypeRepository) {
        this.gasTypeRepository = gasTypeRepository
    }

    async execute(registerGasTypeDto) {
        const withErrorHandling = handleError(async () => {
            const gasTypeAlreadyExists = await this.gasTypeRepository.findByName(registerGasTypeDto.name)
            if (gasTypeAlreadyExists) {
                return Result.failed(new Error('The gas type already exists'))
            }

            //const id = crypto.randomUUID()
            let gastype = GasType.create(registerGasTypeDto.name)
            gastype = await this.gasTypeRepository.create(gastype)

            return Result.success(gastype.toJson())
        })
        return withErrorHandling()
    }

}

module.exports = RegisterGasTypeUseCase