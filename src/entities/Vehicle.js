class Vehicle {

    constructor(standid, brandid, gastypeid, model, year, mileage, price, availability, description, id=undefined) {
        this.standid = standid;
        this.brandid = brandid;
        this.gastypeid = gastypeid;
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
            standid: this.standid,
            brandid: this.brandid,
            gastypeid: this.gastypeid,
            model: this.model,
            year: this.year,
            mileage: this.mileage,
            price: this.price,
            availability: this.availability,
            description: this.description
        }
    }

    editVehicle(vehicleDto) {
        this.standid = vehicleDto.standid ? vehicleDto.standid : this.standid;
        this.brandid = vehicleDto.brandid ? vehicleDto.brandid : this.brandid;
        this.gastypeid = vehicleDto.gastypeid ? vehicleDto.gastypeid : this.gastypeid;
        this.model = vehicleDto.model ? vehicleDto.model : this.model;
        this.year = vehicleDto.year ? vehicleDto.year : this.year;
        this.mileage = vehicleDto.mileage ? vehicleDto.mileage : this.mileage;
        this.price = vehicleDto.price ? vehicleDto.price : this.price;
        this.availability = vehicleDto.availability ? vehicleDto.availability : this.availability;
        this.description = vehicleDto.description ? vehicleDto.description : this.description;
    }

    static create(standid, brandid, gastypeid, model, year, mileage, price, availability, description, id=undefined) {
        if(!standid || !brandid || !gastypeid || !model || !year || !mileage || !price || !availability || !description) {
            throw new Error('Invalid vehicle data');
        }
        
        return new Vehicle(standid, brandid, gastypeid, model, year, mileage, price, availability, description, id);
    }
}

module.exports = Vehicle