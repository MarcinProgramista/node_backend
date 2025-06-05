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
  try {
    const result = await db.query(
      "SELECT notes.id, created, title, users.name, notes.category_id, category.category,  link, content FROM notes JOIN users ON users.id = user_id JOIN category  ON category.id = category_id WHERE notes.user_id= $1",
      [user_id]
    );
    // console.log(result.rows);
    if (result.rowCount === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllNotes, getAllNotesUser };
