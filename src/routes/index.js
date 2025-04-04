import express from "express";
import userRoutes from "./user.route.js";
import articleRoutes from "./article.route.js";
import categoryRoutes from "./category.route.js";
import commentRoutes from "./comment.route.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);

export default router;
