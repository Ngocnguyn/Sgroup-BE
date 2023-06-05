import express from 'express';
import AuthController from './auth.controller.js';
import { registerValidation,loginValidation } from '../../middlewares/validation.js';
const router = express.Router();

router.post('/register',registerValidation, AuthController.register);
router.post('/login',loginValidation, AuthController.login);
router.post('/forget-password',AuthController.requestForgetPassword);
router.post('/forget-password/reset',AuthController.resetPassword);
export default router;