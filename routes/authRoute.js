import express from "express";
import { handleLogin } from "../controllers/authController.js";
import { getRefreshToken } from "../controllers/refreshTokenController.js";

const router = express.Router();
router.post("/login", handleLogin);
router.get("/refresh_token", getRefreshToken);

export default router;
