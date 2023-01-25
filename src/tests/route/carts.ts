import app from '../../server'
import client from '../../database'
import supertest from 'supertest'

const request = supertest(app);

describe('Testing cart router',()=>{

    let newToken: string;
    let newID: Number;

    beforeAll(async () => {
        const response = await request.post('/users')
        .send({
            firstName:'david',
            lastName:'beckham',
            email:'football@manu.com',
            password:'supercalifragilisticexpialidocious'
        })
        newToken = response.body.token;
        newID = response.body.id;
    })

    afterAll(async () => {
        const conn = await client.connect();
        await conn.query('DELETE FROM carts');
        await conn.query('DELETE FROM orders');
        await conn.query('DELETE FROM users');
        await conn.query('DELETE FROM products');
        conn.release();

    });

    it('should index carts', async () => {

        const response = await request.get('/carts')       
        .set('Authorization', 'Bearer ' + newToken);

        expect(response.body).toHaveSize;
    })
 
    it('should return 404 status ', async () => {

        const response = await request.post('/carts').send({
            product_id : '15',
            quantity : '500',
            order_id : '60',
            
        })  

        expect(response.status).toBe(404);
    })
})