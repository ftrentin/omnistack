const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it ('É capaz de criar uma nova ONG', async () =>{
        const response = await request(app)
            .post('/ongs')
            .send({
                name : "GERACAO",
                email : "123@123.com",
                whatsapp : "51983400853",
                city : "Porto Alegre",
                uf: "RS"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});