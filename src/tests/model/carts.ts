import { Order, ordersStore } from '../../models/orders.model';
import {User, usersStore } from '../../models/users.model';
import { Cart, cartsStore } from '../../models/carts.model';
import { Product, productsStore } from '../../models/products.model';
import client from '../../database';

const userStore = new usersStore();
const productStore = new productsStore();
const orderStore = new ordersStore();
const store = new cartsStore();

describe('testing cart.model file',()=>{
    let cartUser : User;
    let cartProduct: Product;
    let cartOrder: Order;

    beforeAll(async () => {
        cartUser = await userStore.create({
            firstName: 'testing',
            lastName: 'carts',
            email: 'testing@carts.com',
            password : 'testpassword'
        })
        cartProduct = await productStore.create({
            name: 'watermelon',
            price: 5
        })
        cartOrder = await orderStore.create({
            user_id : cartUser.id as Number,
            status : 'completed'
        })
    });

    afterAll(async () => {
        const conn = await client.connect();

        await conn.query('DELETE FROM carts;') 
        await conn.query('DELETE FROM orders;') 
        conn.release();
    })

    it('tests create method exists', async ()=>{
        expect(store.create).toBeDefined();
    })

    it('should create a cart', async ()=>{
        const result = await store.create({
            order_id : cartOrder.id as Number,
            product_id: cartProduct.id as Number,
            quantity : 3
        });
        expect(result).toEqual({
            id: result.id,
            order_id : cartOrder.id as Number,
            product_id: cartProduct.id as Number,
            quantity : 3
        })
    });
})