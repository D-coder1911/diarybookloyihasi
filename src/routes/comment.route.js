import express from 'express';
    import commentController from '../controller/comment.controller.js';
    import authMiddleware from '../middleware/auth.js';

    const router = express.Router();

    router.post('/', authMiddleware, commentController.createComment);
    router.get('/', commentController.getComments);
    router.get('/:id', commentController.getComment);
    router.put('/:id', authMiddleware, commentController.updateComment);
    router.delete('/:id', authMiddleware, commentController.deleteComment);

    export default router;