import express from 'express';
const router = express.Router();
const tagController = require('../controller/tag.controller');
const auth = require('../middleware/auth');

router.get('/', tagController.getTags);
router.post('/', auth, tagController.createTag);
router.delete('/:id', auth, tagController.deleteTag);

export default router;
