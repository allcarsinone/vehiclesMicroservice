const pg = require('pg')
const Vehicle = require('../entities/Vehicle')

class PostgreVehicleRepository {
  constructor(baseURI) {
    this.baseURI = baseURI
  }

  async create(vehicle) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`INSERT INTO vehicles (standid, brandid, gastypeid, model, year, mileage, price, availability, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [vehicle.standid, vehicle.brandid, vehicle.gastypeid, vehicle.model, vehicle.year, vehicle.mileage, vehicle.price, vehicle.availability, vehicle.description])
    await client.end()

    return new Vehicle(result.rows[0])
  }

  async deleteVehicle(id) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM vehicles WHERE id = $1`, [id])
    await client.end()
    return ''
  }

  async editVehicle(vehicle) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`UPDATE vehicles SET standid = COALESCE($1, standid), brandid = COALESCE($2, brandid), gastypeid = COALESCE($3, gastypeid), model = COALESCE($4, model), year = COALESCE($5, year), mileage = COALESCE($6, mileage), price = COALESCE($7, price), availability = COALESCE($8, availability), description = COALESCE($9, description) WHERE id = $10 RETURNING *`,
      [vehicle.standid, vehicle.brandid, vehicle.gastypeid, vehicle.model, vehicle.year, vehicle.mileage, vehicle.price, vehicle.availability, vehicle.description, vehicle.id])
    await client.end()
    return new Vehicle(result.rows[0])
  }

  async wipe() {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM vehicles`)
    await client.end()
  }

  async findByID(id) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM vehicles WHERE id = $1`, [id])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return new Vehicle(result.rows[0])
  }

  async deleteByStand(standid) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`DELETE FROM vehicles WHERE standid = $1`, [standid])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return true
  }

  mapRows(rows) {
    return rows.map((row) => {
      return new Vehicle(row.standid, row.brandid, row.gastypeid, row.model, row.year, row.mileage, row.price, row.availability, row.description, row.id)
    })
  }


  async findByStand(standid) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM vehicles INNER JOIN brands ON brands.id = vehicles.brandid INNER JOIN gastypes ON gastypes.id = vehicles.gastypeid WHERE standid = $1`, [standid])
    await client.end()

    if (result.rows.length === 0) {
      return undefined
    }

    const map = this.mapRows(result.rows)

    return map

  }

  async findByBrand(brandname) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM vehicles INNER JOIN brands ON vehicles.brandid = brands.id WHERE LOWER(brands.name) LIKE LOWER('%$1%')`, [brandname])
    await client.end()

    if (result.rows.length === 0) {
      return undefined
    }

    const map = this.mapRows(result.rows)

    return map

  }

  async getVehicles() {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM vehicles INNER JOIN brands ON vehicles.brandid = brands.id INNER JOIN gastypes ON vehicles.gastypeid = gastypes.id`)
    await client.end()

    if (result.rows.length === 0) {
      return undefined
    }

    const map = this.mapRows(result.rows)

    return map

  }

  async getVehicleDetails(vehicleid) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT vc.*, brands.name as "brandname", gp.name as "gastypename" FROM vehicles vc INNER JOIN brands ON vc.brandid = brands.id INNER JOIN gastypes gp ON gp.id = vc.gastypeid WHERE vc.id = $1`, [vehicleid])
    await client.end()

    if (result.rows.length === 0) {
      return undefined
    }

    return new Vehicle(result.rows[0])

  }

  async getVehiclesFilter(vehicle) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT vh.id, vh.model, vh.year, vh.mileage, vh.price, vh.availability, vh.description, br.name as brandname, gp.name as gastypename FROM vehicles vh INNER JOIN brands br ON br.id = vh.brandid INNER JOIN gastypes gp ON gp.id = vh.gastypeid`)
    await client.end()

    if (result.rows.length === 0) {
      return undefined
    }

    if (vehicle.brandname) {
      const filterRegex = new RegExp(vehicle.brandname, 'i');
      result.rows = result.rows.filter(row => filterRegex.test(row.brandname));
    }
    if (vehicle.model) {
      const filterRegex = new RegExp(vehicle.model, 'i');
      result.rows = result.rows.filter(row => filterRegex.test(row.model));
    }
    if (vehicle.year) {
      result.rows = result.rows.filter(row => row.year <= vehicle.year)
    }
    if (vehicle.mileage) {
      result.rows = result.rows.filter(row => row.mileage <= vehicle.mileage)
    }
    if (vehicle.price) {
      result.rows = result.rows.filter(row => row.price <= vehicle.price)
    }
    if (vehicle.availability) {
      result.rows = result.rows.filter(row => row.availability === vehicle.availability)
    }
    if (vehicle.description) {
      const filterRegex = new RegExp(vehicle.description, 'i');
      result.rows = result.rows.filter(row => filterRegex.test(row.description));
    }
    if (vehicle.gastypename) {
      const filterRegex = new RegExp(vehicle.gastypename, 'i');
      result.rows = result.rows.filter(row => filterRegex.test(row.gastypename));
    }

    return result.rows;

  }

}

module.exports = PostgreVehicleRepository