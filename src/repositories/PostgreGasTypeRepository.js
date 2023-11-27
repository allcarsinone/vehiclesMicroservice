const pg = require('pg')
const GasType = require('../entities/GasType')

class PostgreGasTypeRepository {
    constructor (baseURI) {
        this.baseURI = baseURI
    }

    async create (gasType) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`INSERT INTO gastype (name) VALUES ($1) RETURNING *`,
        [gasType.name])
        await client.end()
        return new GasType(result.rows[0].name, result.rows[0].gastypeid)
    }

    async deleteGasType (gasTypeId) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM gastype WHERE gastypeid = $1`, [gasTypeId])
        await client.end()
        return ''
    }

    async editGasType (gasType) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`UPDATE gastype SET name = $1 WHERE gastypeid = $2`,
        [gasType.name, gasType.gastypeid])
        await client.end()
        return new GasType(gasType.name, gasType.gastypeid)
    }

    async wipe () {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM gastype`)
        await client.end()
    }

    async findByID (gasTypeID) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM gastype WHERE gastypeid = $1`, [gasTypeID])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
        return new GasType(result.rows[0].name, result.rows[0].gastypeid)
    }
}

module.exports = PostgreGasTypeRepository