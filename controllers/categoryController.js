import { db } from "../db.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.query("SELECT * FROM category");
    //console.log(categories.rows);

    res.json({ categories: categories.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategriesUser = async (req, res) => {
  const { id } = req.params;

  try {
    const catgories = await db.query(
      "SELECT * FROM category WHERE user_id =$1",
      [id]
    );
    //console.log(user.rows.length);

    res.json({ user: catgories.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllCategories, getAllCategriesUser };
