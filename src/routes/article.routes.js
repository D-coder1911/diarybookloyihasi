import express from "express";
import * as articleController from "../controller/article.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticle);
router.post("/", auth, articleController.createArticle);
router.put("/:id", auth, articleController.updateArticle);
router.delete("/:id", auth, articleController.deleteArticle);

export default router;
