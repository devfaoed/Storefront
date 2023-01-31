import express , {Request, Response} from 'express';
import authToken from '../contoller/auth';
import { Order , ordersStore } from '../model/order';

/**New in this file 
 * reorganizing all the code
 *
 */

const store = new ordersStore();

// 1 -  Create 
    const create =async (req:Request, res:Response) => {

        try{
            const order: Order = {
                status : req.body.status,
                user_id : parseInt(req.body.user_id)
                }

            const result = await store.create(order);

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error creating order")
        }
        
    }

// 2 - index 
    const index =async (req:Request, res:Response) => {

        try{
            const result = await store.index();

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error getting orders")
        }
        
    }

// 3 - show by id 
    const show = async (req:Request, res:Response) =>{
        try{
            const result = await store.show(req.params.id);

            res.json(result)
        }catch(err){
            res.status(500)
            .json("Error getting order")
        }
    }

    const showUsersOrders = async (req:Request, res:Response) =>{
        try{
            const result = await store.showUsersOrders(req.params.id);

            res.json(result)
        }catch(err){
            res.status(500)
            .json("Error getting user's order")
        }
    }

// 4 - Make The Routes
const ordersRouter = (app: express.Application)=>{
    // create an order
    app.post('/orders', authToken, create)
    // show all orders
    app.get('/orders', authToken, index)
    // show an order by id 
    app.get('/orders/:id', authToken, show)
    // show an order by user id 
    app.get('/users/:id/orders', authToken, showUsersOrders)
}

//5 - Export The routes
export default ordersRouter;