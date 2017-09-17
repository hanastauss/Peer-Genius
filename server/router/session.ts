import { Router } from 'express';

import * as functions from './functions/session';
import { checkReview, wrapTryCatch } from './misc/utils';
import { verifySessionToken } from './misc/auth';

const router = Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.use('/', verifySessionToken);
router.post('/info', wrapTryCatch(functions.info));
router.post('/recent', wrapTryCatch(functions.recent));

export default router;
