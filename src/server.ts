import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// model importation
import userRoute from './route/user';
import productRoute from './route/product';
import orderRoute from './route/order';


const app: express.Application = express();
const address: string = "0.0.0.0:4000";
app.use(bodyParser.json());

// seeting up app middleware
productRoute(app);
userRoute(app);
orderRoute(app);

app.listen(4000,  ()=> {
    console.log(`starting app on: ${address}`)
});

export default app;