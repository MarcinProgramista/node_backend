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

const addCategryChoosenUser = async (req, res) => {
  const { user_id, category } = req.body;

  try {
    const duplicate = await db.query(
      "SELECT * FROM category WHERE user_id = $1 AND  category = $2",
      [user_id, category]
    );

    if (duplicate.rowCount !== 0)
      return res.status(400).json({ message: "Category already exist" });
    if (category === "")
      return res.status(400).json({ message: "Category name can't be empty" });
    try {
      const newCategory = await db.query(
        "INSERT INTO category(user_id, category) VALUES($1,$2) RETURNING *",
        [user_id, category]
      );

      res.status(201).json({
        success: `New category ${newCategory.rows[0].category} created`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllCategories, getAllCategriesUser, addCategryChoosenUser };
