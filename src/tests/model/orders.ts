import { Order, ordersStore } from '../../models/orders.model';
import {User, usersStore } from '../../models/users.model';
import client from '../../database';

const users = new usersStore();
const orders = new ordersStore();

describe('testing order.model file',()=>{
    let orderUser : User;

    beforeAll(async () => {
        orderUser = await users.create({
            firstName: 'testing',
            lastName: 'orders',
            email: 'testing@orders.com',
            password : 'testpassword'
        })
    });

    afterAll(async () => {
        const conn = await client.connect();
        await conn.query('DELETE  FROM orders;');
        await conn.query('DELETE  FROM users;');
        conn.release();
    })

    it('tests create method exists', async ()=>{
        expect(orders.create).toBeDefined();
    })

    it('should create an order', async ()=>{
        const result = await orders.create({
            user_id : orderUser.id as Number,
            status : 'completed'
        });
        expect(result).toEqual({
            id: result.id,
            user_id : orderUser.id as Number,
            status : 'completed'
        })
    });

    it('tests show method exists', async ()=>{
        expect(orders.show).toBeDefined();
    }) 

    it('should retrive an order by id',async () => {
        const secondOrder = await orders.create({
            user_id : orderUser.id as Number,
            status : 'pending'
        });
        const result = await orders.show(secondOrder.id as unknown as string); 

        expect(result).toEqual({
            id: secondOrder.id,
            user_id : orderUser.id as Number,
            status : 'pending'
        })
    })

    it('tests index method exists', async ()=>{
        expect(orders.index).toBeDefined();
    })

    it('should return all orders', async ()=>{
        const result = await orders.index();

        expect(result).toHaveSize;
    })

})