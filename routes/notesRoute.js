import express from "express";
import {
  getAllNotes,
  getAllNotesUser,
  addNote,
  getNote,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/all", getAllNotes);
router.get("/user", getAllNotesUser);
router.get("/note/:id", getNote);
router.post("/add", addNote);
router.patch("/update", updateNote);

export default router;
