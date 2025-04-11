import express from 'express';
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/auth');

router.get('/', auth, userController.getUsers);
router.get('/:id', auth, userController.getUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

export default router;
