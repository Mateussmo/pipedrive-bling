import { Router } from 'express';
import ensuredAuthenticated from '../../../shared/middlewares/EnsureAuthenticated';
import DealsController from '../controllers/DealsController';

const router = Router();
const dealsController = new DealsController();

router.use(ensuredAuthenticated);

router.post('/', dealsController.create);

router.get('/', dealsController.findAll);

export default router;
