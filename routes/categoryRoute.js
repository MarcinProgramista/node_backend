import express from "express";
import {
  getAllCategories,
  getAllCategriesUser,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/user/:id", getAllCategriesUser);

export default router;
