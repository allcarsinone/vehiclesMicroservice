const LogService = require("../controllers/services/LogService")

class AuthServiceMiddleware {
    

    static async execute(request, response, next) {
        const authService = request.app.get('AuthAdapter')
        const logService = request.app.get('LogService')

        const token = request.headers.authorization
        if(!token) {
            await LogService.execute({from: 'VehiclesService', data: 'Missing token', date: new Date(), status: 'error'}, logService)
            return response.status(401).json({ error: 'Missing token' })
        }
        const decodedToken = await authService.login(token)
        if(decodedToken.status !== 200) {
            await LogService.execute({from: 'VehiclesService', data: 'Invalid token', date: new Date(), status: 'error'},logService)
            return response.status(401).json(decodedToken.data)
        }
        next()
    }

}
module.exports = AuthServiceMiddleware