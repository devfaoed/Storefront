import { Product, productsStore } from '../../models/products.model';
import client from '../../database';


const store = new productsStore();

describe('testing products.model file',()=>{
    afterAll(async () => {
        const conn = await client.connect();
        await conn.query('DELETE FROM products;') 
        conn.release();
    })

    it('tests create method exists', async ()=>{
        expect(store.create).toBeDefined();
    })

    it('should create a product', async ()=>{
        const result = await store.create({
            name: 'hat',
            price: 175
        });
        expect(result).toEqual({
            id: result.id,
            name: 'hat',
            price: 175
        })
    });

    it('tests show method exists', async ()=>{
        expect(store.show).toBeDefined();
    }) 

    it('should retrive a product by id',async () => {
        const secondProd = await store.create({
            name: 'car',
            price: 175000
        });
        const result = await store.show(secondProd.id as unknown as string); 

        expect(result).toEqual({
            id: secondProd.id,
            name: 'car',
            price: 175000
        })
    })

    it('tests index method exists', async ()=>{
        expect(store.index).toBeDefined();
    })

    it('should return all products', async ()=>{
        const result = await store.index();

        expect(result).toHaveSize;
    })

})