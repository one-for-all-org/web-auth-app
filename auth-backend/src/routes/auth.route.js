import express from "express";
import { login, logout, refreshToken } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/user/login", login);
router.post("/user/refresh", refreshToken);
router.post("/user/logout", logout);

export default router;
