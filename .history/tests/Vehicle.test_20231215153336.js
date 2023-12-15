const makeApp = require('../src/appBuilder')
const Vehicle = require('../src/entities/Vehicle')
const InMemoryVehicleRepository = require('../src/repositories/InMemoryVehicleRepository')
const vehicleRepository = new InMemoryVehicleRepository('')
const app = makeApp(vehicleRepository)
const request = require('supertest')(app)

jest.setTimeout(999999)

describe('Tests', () => {
    describe('POST /vehicles/register', () => {
        it('should return 201 if vehicle is registered', async () => {
            const requestBody = { standid: 1, brandid: 1, gastypeid: 1, model: 'Teste', year: 2020, mileage: 0, price: 0, availability: true, description: 'Teste' }
            const token = '1234567890'
            const response = await request.post('/vehicles/register').set('Authorization', `Bearer ${token}`).send( { requestBody } )
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('brandid', requestBody.brandid)
            expect(response.body).toHaveProperty('gastypeid', requestBody.gastypeid)
            expect(response.body).toHaveProperty('model', requestBody.model)
            expect(response.body).toHaveProperty('year', requestBody.year)
            expect(response.body).toHaveProperty('mileage', requestBody.mileage)
            expect(response.body).toHaveProperty('price', requestBody.price)
            expect(response.body).toHaveProperty('availability', requestBody.availability)
            expect(response.body).toHaveProperty('description', requestBody.description)
        })
    })
})
