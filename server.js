const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const PostgreVehicleRepository = require('./src/repositories/PostgreVehicleRepository')
const PostgreGasTypeRepository = require('./src/repositories/PostgreGasTypeRepository')
const PostgreBrandRepository = require('./src/repositories/PostgreBrandRepository')
const LogMockAdapter = require('./src/adapters/LogMockAdapter')
const AxiosAuthServiceAdapter = require('./src/adapters/AxiosAuthServiceAdapter')
const StandMockAdapter = require('./src/adapters/StandMockAdapter');

dotenv.config()

const app = makeApp(new PostgreVehicleRepository(process.env.DATABASE_URL), 
                    new PostgreGasTypeRepository(process.env.DATABASE_URL), 
                    new PostgreBrandRepository(process.env.DATABASE_URL),
                    new LogMockAdapter(),
                    new AxiosAuthServiceAdapter(process.env.GATEWAY_URI),
                    new StandMockAdapter())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`)
})