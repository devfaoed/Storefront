import express , {Request, Response} from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authToken from "../controller/auth";
import { User, usersStore } from '../model/user';

/**New in this file 
 * 1 - moving password encryption from the model to the route file
 * 2 - fixing the way to use jwt 
 * 3 - reorganizing the whole code
 */


// Declaring Variables
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
const jwtSecret = process.env.JWT_SECRET as string;

const store = new usersStore();

// 1 -  Create 
    const create =async (req:Request, res:Response) => {

        try{
            const user: User = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }

            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));

            const result = await store.create({...user, password: hash});
            const newToken = jwt.sign({user_id: result.id}, jwtSecret)

            res.json({...result,  token: newToken});
        }catch(err){
            res.status(500)
            .json("Error creating user")
        }
        
    }

// 2 - index 
    const index =async (req:Request, res:Response) => {

        try{
            const result = await store.index();

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error getting users")
        }
        
    }

// 3 - show by id 
    const show = async (req:Request, res:Response) =>{
        try{
            const result = await store.show(req.params.id);

            res.json(result)
        }catch(err){
            res.status(500)
            .json("Error getting user")
        }
    }

// 4 -  show by mail (new in this version)
/*    const showByMail = async (req:Request, res:Response)=>{
        try{

            const Email = req.params.email as string;
            const password = req.params.password as string;
            const result = await store.showByMail(Email);

            // making a token after signing in 
            if(bcrypt.compareSync(password + pepper, result.password)){
                const newToken = jwt.sign({user_id: result.id}, jwtSecret)

                res.json({token: newToken});
            }else{
                res.json('login failed');
            }

        }catch(err){
            throw new Error(`${err}`);
        }
    }*/


// 5 - Make The Routes
const usersRoutes = (app: express.Application)=>{
    // create users
    app.post('/users', create)
    // show all users
    app.get('/users', authToken, index)
    // show user by id 
    app.get('/users/:id', authToken, show)
    // sign in
    //app.get('/signin', showByMail) 
}

//6 - Export The routes
export default usersRoutes;