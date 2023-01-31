import app from '../../server'
import client from '../../db'
import supertest from 'supertest'

const request = supertest(app);

describe('Testing order routers',()=>{

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

    it('should create an order', async () => {
       
        const response = await request.post('/orders')
        .send({
            user_id : newID,
            status : 'arriving'
        })
        .set('Authorization', 'Bearer ' + newToken);

        expect(response.body).toEqual({
            id: response.body.id,
            user_id : newID,
            status : 'arriving'
        });
        
    })

    it('should index orders', async () => {

        const response = await request.get('/orders')       
        .set('Authorization', 'Bearer ' + newToken);

        expect(response.body).toHaveSize;
    })

    it('should retrive an order by id', async () => {

        const orderResponse = await request.post(`/orders`)
        .send({
            user_id : newID,
            status : 'arriving'
        })
        .set('Authorization', 'Bearer ' + newToken);

        const fakeorder= orderResponse.body;
        const response= await request.get(`/orders/${fakeorder.id}`)
        .send({
            user_id : newID,
            status : 'arriving'
        })
        .set('Authorization', 'Bearer ' + newToken);
 
        expect(response.body).toEqual({
            id: response.body.id,
            user_id : newID,
            status : 'arriving'
        })
    }) 

    it('should retrive an order by user id', async () => {

        const orderResponse = await request.post(`/orders`)
        .send({
            user_id : newID,
            status : 'arriving'
        })
        .set('Authorization', 'Bearer ' + newToken);

        const response= await request.get(`/users/${newID}/orders`)
        .send({
            user_id : newID,
            status : 'arriving'
        })
        .set('Authorization', 'Bearer ' + newToken);

        expect(response.body).toEqual({
            id : response.body.id,
            status: 'arriving',
            user_id : newID,
        });
    })


})