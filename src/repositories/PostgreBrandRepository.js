const pg = require('pg')
const Brand = require('../entities/Brand')

class PostgreBrandRepository {
    constructor (baseURI) {
        this.baseURI = baseURI
    }

    async create (brand) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`INSERT INTO brands (name) VALUES ($1) RETURNING *`,
        [brand.name])
        await client.end()
        return new Brand(result.rows[0].name, result.rows[0].brandid)
    }

    async deleteBrand (brandId) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM brands WHERE brandid = $1`, [brandId])
        await client.end()
        return ''
    }

    async editBrand (brand) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`UPDATE brands SET name = $1 WHERE brandid = $2`,
        [brand.name, brand.brandid])
        await client.end()
        return new Brand(brand.name, brand.brandid)
    }

    async wipe () {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        await client.query(`DELETE FROM brands`)
        await client.end()
    }

    async findByID (brandID) {
        const client = new pg.Client(this.baseURI)
        await client.connect()
        const result = await client.query(`SELECT * FROM brands WHERE brandid = $1`, [brandID])
        await client.end()
        if (result.rows.length === 0) {
            return undefined
        }
        return new Brand(result.rows[0].name, result.rows[0].brandid)
    }
}

module.exports = PostgreBrandRepository