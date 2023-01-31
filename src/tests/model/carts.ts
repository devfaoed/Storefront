import { Order, ordersStore } from '../../model/order';
import {User, usersStore } from '../../model/user';
import { Cart, cartsStore } from '../../model/cart';
import { Product, productsStore } from '../../model/product';
import client from '../../db'

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