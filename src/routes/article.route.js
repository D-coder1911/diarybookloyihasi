import express from 'express';
    import articleController from '../controller/article.controller.js';
    import authMiddleware from '../middleware/auth.js';

    const router = express.Router();

    router.post('/', authMiddleware, articleController.createArticle);
    router.get('/', articleController.getArticles);
    router.get('/:id', articleController.getArticle);
    router.put('/:id', authMiddleware, articleController.updateArticle);
    router.delete('/:id', authMiddleware, articleController.deleteArticle);

    export default router;