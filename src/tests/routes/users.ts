import app from '../../server'
import client from '../../db'
import supertest from 'supertest'
import { User } from '../../model/user';

const request = supertest(app);

describe('Testing user routes', () => {
    let newUser: User;
    let newToken: string;
    let newID: Number;

    beforeAll(async()=>{
        const response = await request.post('/users')
        .send({
            firstName:'david',
            lastName:'beckham',
            email:'football@manu.com',
            password:'supercalifragilisticexpialidocious'
        })
        newToken = response.body.token;
        newID = response.body.id;
        newUser = response.body;
    })
    afterAll(async()=>{
        const conn = await client.connect();
        await conn.query('DELETE FROM users');

        conn.release();
    })

    it('creates a new user', async() => {
        const response = await request.post('/users')
        .send({
            firstName:'mary',
            lastName:'poppins',
            email:'marypoppins@usps.com',
            password:'supercalifragilisticexpialidocious'
        })

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: response.body.id,
            firstName: 'mary',
            lastName: 'poppins',
            email: 'marypoppins@usps.com',
            password: response.body.password,
            token: response.body.token,
        })
    })

    it('index users', async() => {
        const response = await request.get('/users')
        
        .set('Authorization', 'Bearer ' + newToken)

        expect(response.status).toEqual(200);
        expect(response).toHaveSize;
    })

    it('tests showing user endpoint', async() => {

        const response = await request.get(`/users/${newUser.id}`)
        .set('Authorization', 'Bearer ' + newToken)

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            id: newID,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
        })
    })

    it('should return error unauthorized', async() => {
        const response = await request.get('/users')
        expect(response.status).toEqual(401);
    })
})