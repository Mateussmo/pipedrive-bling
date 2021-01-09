import { Router } from 'express';
import usersRouter from '../modules/users/routes/users.routes';
import dealsRouter from '../modules/deals/routes/deals.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/deals', dealsRouter);

export default routes;
