const makeApp = require('../src/appBuilder')
const Vehicle = require('../src/entities/Vehicle')
const PostgreVehiclesRepository = require('../src/repositories/PostgreVehicleRepository')
const vehicleRepository = new PostgreVehiclesRepository('')
const app = makeApp(vehicleRepository)
const request = require('supertest')(app)

const { GenericContainer, PullPolicy } = require('testcontainers')

let container = new GenericContainer('postgres', 'latest')
let startedContainer

jest.setTimeout(999999)

describe('Tests', () => {
    beforeAll(async () => {
        
        startedContainer = await container.withEnvironment({POSTGRES_USER: 'dss', POSTGRES_PASSWORD: 'dss', POSTGRES_DB: 'vehicles'}).withCopyFilesToContainer([{source:'src/database/init-database.sql', target:'/docker-entrypoint-initdb.d/init-database.sql'}]).withExposedPorts({host: 5433, container: 5432}).withPullPolicy(PullPolicy.defaultPolicy()).start()
        const port = startedContainer.getMappedPort(5432)
        const host = startedContainer.getHost()
        const uri = `postgres://dss:dss@${host}:${port}/vehicles`
        vehicleRepository.baseURI = uri
      })

      afterAll(async () => {
        	await startedContainer.stop()
      })

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoicGF1bG9ncmlwIiwibmFtZSI6IlBhdWxvIEVzdMOqdsOjbyIsImVtYWlsIjoicGF1bG9lc3RldmFvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGl1cHFIdXV6SjNWNmpxNzY2S2U5UE9sUzBKamd2bkp6WUd4ZlJaVTFQWFVaN3l5SncvekpLIiwiYWRkcmVzcyI6bnVsbCwiY2l0eSI6bnVsbCwicG9zdGFsY29kZSI6bnVsbCwibW9iaWxlcGhvbmUiOm51bGwsInJvbGVfaWQiOjEsImlhdCI6MTcwMjQ2MTMwNCwiZXhwIjoxNzAyNDY4NTA0fQ.FK1QlYkiXwOjskLtaHY-N6hLTTiZMCoa1g_pP02BKBM'

      describe('POST /vehicles/register', () => {
        it('should return 201 if vehicle is registered', async () => {
          const requestBody = { standid: 1, brandid: 1, gastypeid: 1, model: 'Teste', year: 2020, mileage: 0, price: 0, availability: true, description: 'Teste' }
          const response = (await request.post('/vehicles/register')).set('Authorization', `Bearer ${token}`).send(requestBody)
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