import { Application, Router } from 'express';

import { ProductController } from './route/productRoute';
import { UserController } from './route/userRoute';
import { OrderController } from './route/orderRoute';

const _routes: [string, Router][] = [
  ['/products', ProductController],
  ['/users', UserController],
  ['/orders', OrderController]
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
