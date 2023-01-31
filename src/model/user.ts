import client from "../db";

// 1 - Make a User type

export type User = {
    id?: Number;
    firstName : string;
    lastName: string;
    email: string;
    password: string;
}

// 2 - Making the usersStore Class and exporting it 

export class usersStore {

    // A - Create a user 
   async create(user:User){
        try{
            const conn = await client.connect();
            const sql = 'INSERT into users ("firstName","lastName","email","password") VALUES($1,$2,$3,$4) RETURNING *';

            const result = await conn.query(sql, [user.firstName, user.lastName, user.email, user.password])
            conn.release();

            return result.rows[0]
        }catch(err){
            return 'Check your entries'
        }   
    }

    // B - index users
    async index(){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        }catch(err){
            return 'Cannot get users'
        }     
    }

    // C- Show user by id
    async show(id:string){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=$1';

            const result = await conn.query(sql, [id])
            conn.release();

            return result.rows[0]
        }catch(err){
            return 'Check user id'
        }   
    }

    // D - Show by Email (new in this version)
 /*   async showByMail(email:string): Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users where email=$1';

            const result = await conn.query(sql, [email])
            conn.release();

            return result.rows[0]
        }catch(err){
            throw new Error(`${err}`);
        }   
    }*/
}