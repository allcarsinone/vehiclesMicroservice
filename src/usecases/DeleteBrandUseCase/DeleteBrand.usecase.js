const Brand = require('../../entities/Brand')
const { Result, handleError } = require('../../util/Result')
const { json } = require('express')

class DeleteBrandUseCase {
    /**
     * @description Constructor of DeleteBrandUseCase
     * @param {*} brandRepository a brandRepository
     */
    constructor (brandRepository) {
        this.brandRepository = brandRepository
    }

    async execute(deleteBrandDto) {
        const withErrorHandling = handleError(async () => {
            const brandExists = await this.brandRepository.findByID(deleteBrandDto.brandid)

            if(!brandExists) {
                return Result.failed(new Error('Brand doesnt exists'))
            }

            const brand = await this.brandRepository.deleteBrand(deleteBrandDto.brandid)

            return Result.success(json({success: 'true'}))
        })

        return withErrorHandling()
    }
}

module.exports = DeleteBrandUseCase