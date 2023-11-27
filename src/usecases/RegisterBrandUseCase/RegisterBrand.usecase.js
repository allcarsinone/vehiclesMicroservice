const Brand = require('../../entities/Brand')
const { Result, handleError } = require('../../util/Result')

class RegisterBrandUseCase {
    /**
     * @description Constructor of RegisterBrandUseCase
     * @param {*} brandRepository a brandRepository
     */
    constructor (brandRepository) {
        this.brandRepository = brandRepository
    }

    async execute(registerBrandDto) {
        const withErrorHandling = handleError(async () => {
            const brandAlreadyExists = await this.brandRepository.findByID(registerBrandDto.brandid)
            if (brandAlreadyExists) {
                return Result.failed(new Error('The brand already exists'))
            }

            const id = crypto.randomUUID()
            let brand = Brand.create(registerBrandDto.name, id)
            brand = await this.brandRepository.create(brand)

            return Result.success(brand.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = RegisterBrandUseCase