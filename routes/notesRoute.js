import express from "express";
import {
  getAllNotes,
  getAllNotesUser,
  addNote,
  getNote,
  updateNote,
  deleteNote,
  getCategoryNotes,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/all", getAllNotes);
router.get("/user", getAllNotesUser);
router.get("/note/:id", getNote);
router.get("/:category_id", getCategoryNotes);
router.post("/add", addNote);
router.patch("/update", updateNote);
router.delete("/delete/:id", deleteNote);

export default router;
