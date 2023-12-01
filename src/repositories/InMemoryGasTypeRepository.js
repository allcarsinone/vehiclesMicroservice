/**
 * @description This is a in-memory repository, it can be a mysql, postgres, mongodb, etc
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

class InMemoryGasTypeRepository {
    static CURRENT_ID = 1
    constructor () {
        this.gastypes = []
    }

    async create(gasType) {
        gasType.id = InMemoryGasTypeRepository.CURRENT_ID++
        this.gastypes.push(gasType)
        return gasType
    }

    async deleteGasType(id) {
        this.gastypes = this.gastypes.filter((g) => g.id === id)
        if (this.gastypes.length === 0) {
            return false
        }
        return true
    }

    async findByID(id) {
        return this.gastypes.find((g) => g.id === id)
    }

    async editGasType(gasType) {
        const index = this.gastypes.findIndex((g) => g.id === gasType.id)
        this.gastypes[index] = gasType
        return gasType
    }

    async wipe() {
        this.gastypes = []
    }

}