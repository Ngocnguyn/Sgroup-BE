import express from 'express';
import { UserRouter } from './users/index.js';
import { AuthRouter } from './auth/index.js';
import { ProfileRouter } from './profile/index.js';

const router = express.Router();

// router.use('/users', UserRouter);
router.use('/users', ProfileRouter);
router.use('/auth', AuthRouter);

export default router;