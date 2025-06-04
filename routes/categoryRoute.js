import express from "express";
import {
  getAllCategories,
  getAllCategriesUser,
  addCategryChoosenUser,
  updateCategryChoosenUser,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/user/:id", getAllCategriesUser);
router.post("/add", addCategryChoosenUser);
router.patch("/update", updateCategryChoosenUser);
export default router;
