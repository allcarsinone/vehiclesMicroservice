class Vehicle {

    constructor(stand, brand, gastype, model, year, mileage, price, availability, description, id=undefined) {
        this.stand = stand;
        this.brand = brand;
        this.gastype = gastype;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.price = price;
        this.availability = availability;
        this.description = description;
        this.id = id;
    }

    toJson() {
        return {
            stand: this.stand,
            brand: this.brand,
            gastype: this.gastype,
            model: this.model,
            year: this.year,
            mileage: this.mileage,
            price: this.price,
            availability: this.availability,
            description: this.description
        }
    }

    editVehicle(vehicleDto) {
        this.stand = vehicleDto.stand ? vehicleDto.stand : this.stand;
        this.brand = vehicleDto.brand ? vehicleDto.brand : this.brand;
        this.gastype = vehicleDto.gastype ? vehicleDto.gastype : this.gastype;
        this.model = vehicleDto.model ? vehicleDto.model : this.model;
        this.year = vehicleDto.year ? vehicleDto.year : this.year;
        this.mileage = vehicleDto.mileage ? vehicleDto.mileage : this.mileage;
        this.price = vehicleDto.price ? vehicleDto.price : this.price;
        this.availability = vehicleDto.availability ? vehicleDto.availability : this.availability;
        this.description = vehicleDto.description ? vehicleDto.description : this.description;
    }

    static create(stand, brand, gastype, model, year, mileage, price, availability, description, id=undefined) {
        if(!stand || !brand || !gastype || !model || !year || !mileage || !price || !availability || !description) {
            throw new Error('Invalid vehicle data');
        }
        
        return new Vehicle(stand, brand, gastype, model, year, mileage, price, availability, description, id);
    }
}

module.exports = Vehicle