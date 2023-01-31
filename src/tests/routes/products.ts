import app from '../../server'
import client from '../../db'
import supertest from 'supertest'

const request = supertest(app);

describe('Testing products routes', () => {

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
        const conc = await client.connect();
        await conc.query('DELETE FROM products;');
        await conc.query('DELETE FROM users;');
        await conc.release();
      });

    it('should create a product',async () => {

        const response = await request.post('/products')
        .send({
            name: 'harddisk',
            price: 200    
            })
        .set('Authorization', 'Bearer ' + newToken);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ id: response.body.id,name: 'harddisk',price:200});
    });
    
    it('should index all products',async () => {
        const response = await request.get('/products')

        expect(response.status).toEqual(200);
        expect(response.body)
        .toEqual([{ 
             id: response.body[0].id,
             name: 'harddisk',
              price: 200,
            }]);
    })

    it('should retrive a product by id',async () => {

        const fakeresponse = await request.post('/products')
        .send({name: 'cd',
                price: 5    
            })
        .set('Authorization', 'Bearer ' + newToken);

        const seconedProduct = fakeresponse.body;
        const response = await request.get(`/products/${seconedProduct.id}`);


        expect(response.status).toEqual(200);
        expect(response.body)
        .toEqual({ id: response.body.id,
             name: 'cd',
              price: 5
            });
    });

    it('should return error unauthorized',async () => {

        const response = await request.post('/products')
        .send({name: 'harddisk',
                price: 200    
            })

        expect(response.status).toEqual(401);
    });


})