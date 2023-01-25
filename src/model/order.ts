import client from "../db";

// 1 - Make an order type
export type Order = {
    id?: Number;
    user_id: Number;
    status: String;
}


// 2 - Making the orders store Class and exporting it 
export class ordersStore{

    // A - create an order 
    async create(order:Order){
        try{
            const conn = await client.connect();
            const sql = 'INSERT into orders (user_id,status) VALUES($1,$2) RETURNING *';

            const result = await conn.query(sql, [order.user_id, order.status]);
            conn.release();

            return result.rows[0]
        }catch(err){
            return 'Check your entries'
        }
        
    }


    // B - index all orders 
    async index(){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        }catch(err){
            return 'Cannot get orders'
        }
        
    }
    

    // C - show an order 
    async show(id:string){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders where id=$1';

            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        }catch(err){
            return 'Check order id'
        }
        
    }

    async showUsersOrders(id:string){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders where user_id=$1';

            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0]
        }catch(err){
            return 'Check user id'
        }        
    }
}