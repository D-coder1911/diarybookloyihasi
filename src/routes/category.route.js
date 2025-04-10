import express from 'express';
    import categoryController from '../controller/category.controller.js';
    import authMiddleware from '../middleware/auth.js';

    const router = express.Router();

    router.post('/', authMiddleware, categoryController.createCategory);
    router.get('/', categoryController.getCategories);
    router.get('/:id', categoryController.getCategory);
    router.put('/:id', authMiddleware, categoryController.updateCategory);
    router.delete('/:id', authMiddleware, categoryController.deleteCategory);

    export default router;