import express from 'express';
    import userController from '../controller/user.controller.js';

    const router = express.Router();

    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.post('/logout', userController.logout);

    export default router;