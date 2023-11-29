const pg = require('pg')
const Vehicle = require('../entities/Vehicle')

class PostgreVehicleRepository {
  constructor (baseURI) {
    this.baseURI = baseURI
  }

  async create (vehicle) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`INSERT INTO vehicles (standid, brandid, gastypeid, model, year, mileage, price, availability, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [vehicle.standid, vehicle.brandid, vehicle.gastypeid, vehicle.model, vehicle.year, vehicle.mileage, vehicle.price, vehicle.availability, vehicle.description])
    await client.end()
    
    return new Vehicle(result.rows[0].standid, result.rows[0].brandid, result.rows[0].gastypeid, result.rows[0].model, result.rows[0].year, result.rows[0].mileage, result.rows[0].price, result.rows[0].availability, result.rows[0].description, result.rows[0].id)
  }

  async deleteVehicle (id) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM vehicles WHERE id = $1`, [id])
    await client.end()
    return ''
  }

  async editVehicle (vehicle) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`UPDATE vehicles SET standid = $1, brandid = $2, gastypeid = $3, model = $4, year = $5, mileage = $6, price = $7, availability = $8, description = $9 WHERE id = $10`,
    [vehicle.standid, vehicle.brandid, vehicle.gastypeid, vehicle.model, vehicle.year, vehicle.mileage, vehicle.price, vehicle.availability, vehicle.description, vehicle.id])
    await client.end()
    return new Vehicle(vehicle.standid, vehicle.brandid, vehicle.gastypeid, vehicle.model, vehicle.year, vehicle.mileage, vehicle.price, vehicle.availability, vehicle.description, vehicle.id)
  }

  async wipe () {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM vehicles`)
    await client.end()
  }

  async findByID (id) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM vehicles WHERE id = $1`, [id])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return new Vehicle(result.rows[0].standid, result.rows[0].brandid, result.rows[0].gastypeid, result.rows[0].model, result.rows[0].year, result.rows[0].mileage, result.rows[0].price, result.rows[0].availability, result.rows[0].description, result.rows[0].id)
  }

}

module.exports = PostgreVehicleRepository