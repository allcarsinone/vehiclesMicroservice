const app = require('../app');
const request = require('supertest');

describe('POST /vehicle/register', () => {
    describe('quando o payload é inválido', () => {
        test('retorna status 400', async () => {
            const payload = {
                nome: 'Fusca',
                marca: 'Volkswagen'
            }
            const response = await request(app).post('/vehicle/register').send(payload);
            expect(response.status).toBe(400);
        });
        test('retorna mensagem de erro', async () => {
            const payload = {
                nome: 'Fusca',
                marca: 'Volkswagen'
            }
            const response = await request(app).post('/vehicle/register').send(payload);
            expect(response.body.message).toBe('Dados inválidos');
        });
    });
    describe('quando o payload é válido', () => {
        test('retorna status 200', async () => {
            const payload = {
                nome: 'Fusca',
                marca: 'Volkswagen',
                valor: 20000
            }
            const response = await request(app).post('/vehicle/register').send(payload);
            expect(response.status).toBe(200);
        });
        test('retorna um objeto', async () => {
            const payload = {
                nome: 'Fusca',
                marca: 'Volkswagen',
                valor: 20000
            }
            const response = await request(app).post('/vehicle/register').send(payload);
            expect(typeof response.body).toBe('object');
        });
        test('retorna um objeto com as propriedades id, nome, marca e valor', async () => {
            const payload = {
                nome: 'Fusca',
                marca: 'Volkswagen',
                valor: 20000
            }
            const response = await request(app).post('/vehicle/register').send(payload);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('marca');
            expect(response.body).toHaveProperty('valor');
        });
    });
})