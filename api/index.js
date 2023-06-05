import express from 'express';
import { UserRouter } from './users/index.js';
import { AuthRouter } from './auth/index.js';
import { ProfileRouter } from './profile/index.js';
// import { MailRouter} from './mail/index.js';
const router = express.Router();

router.use('/users', UserRouter);
router.use('/profile', ProfileRouter);
router.use('/auth', AuthRouter);
// router.use('/mail', MailRouter)
export default router;