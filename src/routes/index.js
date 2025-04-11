import express from "express";
import authRoutes from "./auth.routes.js";
import articleRoutes from "./article.routes.js";
import categoryRoutes from "./category.routes.js";
import commentRoutes from "./comment.routes.js";
import tagRoutes from "./tag.routes.js";
import userRoutes from "./user.routes.js";
import voteRoutes from "./vote.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);
router.use("/tags", tagRoutes);
router.use("/users", userRoutes);
router.use("/votes", voteRoutes);

export default router;
