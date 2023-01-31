import express , {Request, Response} from 'express';
import authToken from '../contoller/auth';
import { Product, productsStore } from '../model/product';

/**New in this file 
 * reorganizing all the code
 *
 */

const store = new productsStore();

// 1 -  Create 
    const create =async (req:Request, res:Response) => {

        try{
            const product: Product = {
                name : req.body.name,
                price : parseInt(req.body.price)
                }

            const result = await store.create(product);

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error creating product")
        }
        
    }

// 2 - index 
    const index =async (req:Request, res:Response) => {

        try{
            const result = await store.index();

            res.json(result);
        }catch(err){
            res.status(500)
            .json("Error getting products")

        }
        
    }

// 3 - show by id 
    const show = async (req:Request, res:Response) =>{
        try{
            const result = await store.show(req.params.id);

            res.json(result)
        }catch(err){
            res.status(500)
            .json("Error getting product")
        }
    }

// 4 - Make The Routes
const productsRoutes = (app: express.Application)=>{
    // create a product
    app.post('/products', authToken, create)
    // show all products
    app.get('/products', index)
    // show a product by id 
    app.get('/products/:id', show)
}

//5 - Export The routes
export default productsRoutes;