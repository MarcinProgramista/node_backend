import express from "express";
import {
  getAllCategories,
  getAllCategriesUser,
  addCategoryForUser,
  updateCategryChoosenUser,
  deleteCategryChoosenUser,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/user/:id", getAllCategriesUser);
router.post("/add", addCategoryForUser);
router.patch("/update", updateCategryChoosenUser);
router.delete("/delete/:category_id", deleteCategryChoosenUser);

export default router;
