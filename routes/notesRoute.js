import express from "express";
import {
  getAllNotes,
  getAllNotesUser,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/all", getAllNotes);
router.get("/user", getAllNotesUser);

export default router;
