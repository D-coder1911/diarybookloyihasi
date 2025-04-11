import express from 'express';
const router = express.Router();
const commentController = require('../controller/comment.controller');
const auth = require('../middleware/auth');

router.get('/', commentController.getComments);
router.post('/', auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

export default router;
