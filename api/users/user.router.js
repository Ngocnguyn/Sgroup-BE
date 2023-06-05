import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

router.get('/search',UserController.searchUsers);
router.get('/', UserController.getAllUsers);
router.get('/:id',UserController.getUserById);
router.post('/',UserController.createNewUser);
router.put('/:id',UserController.updateUser);
router.delete('/:id',UserController.removeUser);

export default router;