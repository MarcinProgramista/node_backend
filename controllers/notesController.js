import { db } from "../db.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await db.query("SELECT * FROM notes");
    return res.json({ notes: notes.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllNotes };
