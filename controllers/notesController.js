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
      return res.status(200).json(null);
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
  //console.log(id);

  try {
    const note = await db.query("SELECT * FROM notes WHERE id= $1", [id]);
    console.log(note.rows[0]);
    if (note.rowCount === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(note.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryNotes = async (req, res) => {
  const { category_id } = req.params;
  //console.log(category_id);
  try {
    const notes = await db.query("SELECT * FROM notes WHERE category_id= $1", [
      category_id,
    ]);
    // console.log(notes.rows);
    if (notes.rowCount === 0) {
      return res.status(200).json([]);
    }
    return res.json(notes.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id, title, created, link, content } = req.body;

  try {
    const updatedNote = await db.query(
      "UPDATE notes SET title = $1, content = $2 , created = $3, link = $4 WHERE id = $5 RETURNING *",
      [title, content, created, link, id]
    );

    return res.status(200).json(updatedNote.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const result = await db.query("DELETE FROM notes WHERE id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Word not found", ok: false });

    return res
      .status(200)
      .json({ message: `Deleted item with ${id}`, ok: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllNotes,
  getAllNotesUser,
  addNote,
  getNote,
  updateNote,
  deleteNote,
  getCategoryNotes,
};
