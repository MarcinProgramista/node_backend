import express from "express";
import {
  getAllNotes,
  getAllNotesUser,
  addNote,
  getNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/all", getAllNotes);
router.get("/user", getAllNotesUser);
router.get("/note/:id", getNote);
router.post("/add", addNote);

export default router;
