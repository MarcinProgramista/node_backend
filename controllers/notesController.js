import { db } from "../db.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await db.query("SELECT * FROM notes");
    return res.json({ notes: notes.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllNotesUser = async (req, res) => {
  const { user_id } = req.query;
  // console.log(user_id);

  try {
    const result = await db.query(
      "SELECT notes.id, created, title, notes.user_id,  notes.category_id,   link, content FROM notes  WHERE notes.user_id= $1",
      [user_id]
    );
    //console.log(result.rows);
    if (result.rowCount === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNote = async (req, res) => {
  const { user_id, category_id, title, created, link, content } = req.body;

  try {
    const newNote = await db.query(
      "INSERT INTO notes (title, user_id, category_id, created, link, content) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, user_id, category_id, created, link, content]
    );

    return res.status(200).json(newNote.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const note = await db.query("SELECT * FROM notes WHERE id= $1", [id]);
    console.log(note.rows);
    if (note.rowCount === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(note.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllNotes, getAllNotesUser, addNote, getNote };
