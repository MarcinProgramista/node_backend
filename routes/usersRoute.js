import express from "express";
import { getAllUsers, getUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;
