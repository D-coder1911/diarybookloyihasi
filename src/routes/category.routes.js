import express from 'express';
const router = express.Router();
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/auth');

router.get('/', categoryController.getCategories);
router.post('/', auth, categoryController.createCategory);

export default router;
