class AuthServiceMiddleware {
    static async execute(request, response, next) {
        const authService = request.app.get('AuthAdapter')
        const logService = request.app.get('LogAdapter')

        const token = request.headers.authorization
        if(!token) {
            await logService.execute('StandsService', 'Missing token', 'error')
            return response.status(401).json({ error: 'Missing token' })
        }
        const decodedToken = await authService.login(token)
        if(decodedToken.status !== 200) {
            await logService.execute('StandsService', 'Invalid token', 'error')
            return response.status(401).json(decodedToken.data)
        }
        next()
    }
}
module.exports = AuthServiceMiddleware