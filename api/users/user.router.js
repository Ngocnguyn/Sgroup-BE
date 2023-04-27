import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/',UserController.createNewUser);
router.get('/:id',UserController.getUserById);
router.put('/:id',UserController.updateUser);
router.delete('/:id',UserController.removeUser);

export default router;