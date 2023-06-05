import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id',UserController.getUserById);
router.get('/search',UserController.searchUsers);
router.post('/',UserController.createNewUser);
router.put('/:id',UserController.updateUser);
router.delete('/:id',UserController.removeUser);

export default router;