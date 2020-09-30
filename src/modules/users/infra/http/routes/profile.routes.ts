import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controller/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileController = new ProfileController();
const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
