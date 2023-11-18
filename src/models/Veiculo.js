const pg = require('pg') // base de dados postgres
const dotenv = require('dotenv'); // variaveis de ambiente

dotenv.config();

class Veiculo {

    static async registerVehicle(nome, marca, valor) {
        const connection = new pg.Client(process.env.DATABASE_URL);

        await connection.connect(); 

        // Validar dados
        const vehicle = new Veiculo(nome, marca, valor);
        const query = 'INSERT INTO vehicles (nome, marca, valor) VALUES ($1, $2, $3) RETURNING *';
        const values = [vehicle.nome, vehicle.marca, vehicle.valor];
        const result = await connection.query(query, values);
        await connection.end();

        const newVehicle = new Veiculo(result.rows[0].nome, result.rows[0].marca, result.rows[0].valor, result.rows[0].vehicleid);
        return newVehicle;
    }
    constructor(nome, marca, valor, id=undefined) {
        this.id = id;
        this.nome = nome;
        this.marca = marca;
        this.valor = valor;

    }	
}

module.exports = Veiculo;