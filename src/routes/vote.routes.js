import express from 'express';
const router = express.Router();
const voteController = require('../controller/vote.controller');
const auth = require('../middleware/auth');

router.post('/upvote', auth, voteController.voteArticle);
router.post('/downvote', auth, voteController.downvoteArticle);

export default router;
