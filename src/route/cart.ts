import express , {Request, Response} from 'express';
import authToken from '../contoller/auth';
import { Cart, cartsStore } from '../model/cart';

/**New in this file 
 * The whole file new in this version 
 */

const store = new cartsStore();

// 1 -  Create 
    const create =async (req:Request, res:Response) => {

        try{
            const cart: Cart = {
                product_id : parseInt(req.body.product_id),
                quantity : parseInt(req.body.quantity),
                order_id : parseInt(req.body.order_id),
                }

            const result = await store.create(cart);

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error creating cart")
        }
        
    }
    // 2 - index
    const index =async (req:Request, res:Response) => {

        try{
            const result = await store.index();

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error getting carts")
        }
        
    }

// 4 - Make The Routes
const cartsRouter = (app: express.Application)=>{
    // create a cart
    app.get('/carts', authToken, index);
    // index carts
    app.post('/carts', authToken, create);
}

//5 - Export The routes
export default cartsRouter;