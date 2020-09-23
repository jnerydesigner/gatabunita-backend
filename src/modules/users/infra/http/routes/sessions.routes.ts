import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controller/SessionsController';

const sessionsController = new SessionsController();

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.autenticate);

export default sessionsRouter;
