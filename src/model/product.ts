import client from "../db";

// 1 - Make a Product type
export type Product = {
    id?: Number;
    name: string;
    price: Number;
}

// 2 - Making the productStore Class and exporting it 
export class productsStore{

    // A - Create a product
    async create(product:Product){
        try{
            const conn = await client.connect();
            const sql = 'INSERT into products (name,price) VALUES($1,$2) RETURNING *';

            const result = await conn.query(sql, [product.name, product.price]);
            return result.rows[0]
        }catch(err){
            return 'Cannot create product'
        }
    }  

    // B - index products
    async index(){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);
            return result.rows
        }catch(err){
            return 'Cannot get products'
        }
    }

    // C - Show one product
    async show(id:string){
       try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products where id=$1';
    
            const result = await conn.query(sql, [id]);
            return result.rows[0]
        }catch(err){
            return 'Check product id'
        }
    }
}