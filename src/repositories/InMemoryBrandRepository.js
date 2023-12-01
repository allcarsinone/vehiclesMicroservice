/**
 * @description This is a in-memory repository, it can be a mysql, postgres, mongodb, etc
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

class InMemoryBrandRepository {
    static CURRENT_ID = 1
    constructor () {
        this.brands = []
    }

    async create(brand) {
        brand.id = InMemoryBrandRepository.CURRENT_ID++
        this.brands.push(brand)
        return brand
    }

    async deleteBrand(id) {
        this.brands = this.brands.filter((b) => b.id === id)
        if (this.brands.length === 0) {
            return false
        }
        return true
    }

    async findByID(id) {
        return this.brands.find((b) => b.id === id)
    }

    async editBrand(brand) {
        const index = this.brands.findIndex((b) => b.id === brand.id)
        this.brands[index] = brand
        return brand
    }

    async wipe() {
        this.brands = []
    }

}