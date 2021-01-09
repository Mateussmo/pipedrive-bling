import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import CreateUserValidation from '../ middlewares/CreateUserValidation';
import UpdatedUserValidation from '../ middlewares/UpdateUserValidation';
import ensuredAuthenticated from '../../../shared/middlewares/EnsureAuthenticated';

const router = Router();

const usersController = new UsersController();

router.post('/', CreateUserValidation, usersController.store);

router.post(
  '/authenticate',
  CreateUserValidation,
  usersController.authenticate,
);

router.patch(
  '/',
  ensuredAuthenticated,
  UpdatedUserValidation,
  usersController.update,
);

router.delete('/:userId', ensuredAuthenticated, usersController.delete);

router.get('/', usersController.find);

export default router;
