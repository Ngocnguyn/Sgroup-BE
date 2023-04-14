const express = require('express');
const userValidate = require('../middlewares/userValidate');
const userController = require('../controller/user');


const router = express.Router();
router.get('/', userController.getAllUsers);
router.get('/:id',userController.getUser);
router.post('/', userValidate, userController.postAddUser);
router.put('/:id',userValidate, userController.putUpdateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router;