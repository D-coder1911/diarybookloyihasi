import express from 'express';
    import tagController from '../controller/tag.controller.js';
    import authMiddleware from '../middleware/auth.js';

    const router = express.Router();

    router.post('/', authMiddleware, tagController.createTag);
    router.get('/', tagController.getTags);
    router.get('/:id', tagController.getTag);
    router.put('/:id', authMiddleware, tagController.updateTag);
    router.delete('/:id', authMiddleware, tagController.deleteTag);

    export default router;