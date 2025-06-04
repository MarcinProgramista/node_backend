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

export { getAllCategories };
