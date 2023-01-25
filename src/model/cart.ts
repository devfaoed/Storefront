import client from "../db";


// 1 - Make a cart type
export type Cart = {
    id? : Number;
    product_id: Number;
    order_id: Number;
    quantity: Number;
}


// 2 - Making the orders store Class and exporting it 
export class cartsStore {
    // A creating a cart
    async create(cart:Cart){
        try {
            const conn = await client.connect();
            const sql = 'INSERT into carts (order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [cart.order_id, cart.product_id, cart.quantity]);

            conn.release();
            return result.rows[0]

        }catch(err){
            return 'Check your entries'
        }
        
    }

    // B - index
    async index(){
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM carts';
            const result = await conn.query(sql);

            conn.release();
            return result.rows

        }catch(err){
            return 'Cannot get carts'
        }
        
    }
}