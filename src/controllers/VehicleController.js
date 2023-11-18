const Vehicle = require('../models/Veiculo');

class VehicleController {
    async registerVehicle(req, res) {
        try {
        const { nome, marca, valor } = req.body;
        if(!nome || !marca || !valor) return res.status(400).json({ message: 'Dados inválidos' })
        const vehicle = await Vehicle.registerVehicle(nome, marca, valor);
        return res.status(200).json(vehicle);
        }catch(error) {
            console.log(error); //send to microservice logs
            return res.status(500).json({ message: 'Erro interno' })
        }
    }
}

module.exports = VehicleController