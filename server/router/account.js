import express from 'express';

import * as functions from './functions/account';
import { wrapTryCatch } from './misc/utils';

const router = express.Router();
// Reminder: remember to use wrapTryCatch to enable express error handling on promise rejection errors!

router.post('/edit', wrapTryCatch(functions.edit));

export default router;
