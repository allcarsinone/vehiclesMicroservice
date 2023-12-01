/**
 * @description This is a in-memory repository, it can be a mysql, postgres, mongodb, etc
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

class InMemoryVehicleRepository {
    static CURRENT_ID = 1
    constructor () {
        this.vehicles = []
    }

    /**
     * @description Create a vehicle on the repository
     * @param {*} vehicle vehicle object
     * @returns the added object
     */
    async create(vehicle) {
        vehicle.id = InMemoryVehicleRepository.CURRENT_ID++
        this.vehicles.push(vehicle)
        return vehicle
    }

    /**
     * @description Edit a vehicle on the repository
     * @param {*} vehicle vehicle object
     * @returns the updated object
     */
    async editVehicle(vehicle) {
        const index = this.vehicles.findIndex((v) => v.id === vehicle.id)
        this.vehicles[index] = vehicle
        return vehicle
    }

    /**
     * @description Delete a vehicle on the repository
     * @param {*} id vehicle id 
     * @returns true if deleted, false if not
     */
    async deleteVehicle(id) {
        this.vehicles = this.vehicles.filter((v) => v.id === id)
        if (this.vehicles.length === 0) {
            return false
        }
        return true
    }
    
    /**
     * @description Find a vehicle on the repository
     * @param {*} id vehicle id
     * @returns vehicle object
     */
    async findByID(id) {
        return this.vehicles.find((v) => v.id === id)
    }

}

module.exports = InMemoryVehicleRepository