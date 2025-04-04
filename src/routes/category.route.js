import express from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
