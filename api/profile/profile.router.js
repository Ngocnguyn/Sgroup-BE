import express from 'express';
import ProfileController from './profile.controller.js';
import {authenticationToken} from '../../middlewares/authentication.js';

const router = express.Router();
router.put('/update/:id',authenticationToken, ProfileController.updateProfile);
export default router;