const Brand = require('../../entities/Brand')
const { Result, handleError } = require('../../util/Result')

class EditBrandUseCase {
    /**
     * @description Constructor of EditBrandUseCase
     * @param {*} brandRepository a brandRepository
     */
    constructor (brandRepository) {
        this.brandRepository = brandRepository
    }

    async execute(editBrandDto) {
        const withErrorHandling = handleError(async () => {
            const brandExists = await this.brandRepository.findByID(editBrandDto.brandid)
            if(!brandExists) {
                return Result.failed(new Error('Brand doesnt exists'))
            }
            brandExists.editBrand(editBrandDto)
            let brand = await this.brandRepository.editBrand(brandExists)
            return Result.success(brand.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = EditBrandUseCase