import express from "express";
import {
  createComment,
  getCommentsByArticle,
  updateComment,
  deleteComment,
} from "../controller/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:articleId", getCommentsByArticle);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
