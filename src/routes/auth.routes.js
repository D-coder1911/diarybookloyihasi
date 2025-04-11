import express from "express";
import authController from "../controller/auth.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

export default router;
