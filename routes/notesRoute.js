import express from "express";
import {
  getAllNotes,
  getAllNotesUser,
  addNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/all", getAllNotes);
router.get("/user", getAllNotesUser);
router.post("/add", addNote);

export default router;
