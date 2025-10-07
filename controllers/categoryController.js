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

    res.json(catgories.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCategoryForUser = async (req, res) => {
  const { user_id, category } = req.body;

  // Walidacja danych wejściowych
  if (!user_id || !category) {
    return res.status(400).json({
      message: "User ID and category name are required",
    });
  }

  if (typeof category !== "string" || category.trim().length === 0) {
    return res.status(400).json({
      message: "Category name must be a non-empty string",
    });
  }

  if (!Number.isInteger(Number(user_id))) {
    return res.status(400).json({
      message: "User ID must be a valid number",
    });
  }

  const categoryName = category.trim();

  try {
    // Sprawdź czy kategoria już istnieje
    const duplicate = await db.query(
      "SELECT id FROM category WHERE user_id = $1 AND LOWER(category) = LOWER($2)",
      [user_id, categoryName]
    );

    if (duplicate.rows.length > 0) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    const newCategory = await db.query(
      "INSERT INTO category(user_id, category) VALUES($1, $2) RETURNING *",
      [user_id, categoryName]
    );

    res.status(201).json({
      message: `Category "${newCategory.rows[0].category}" created successfully`,
      category: newCategory.rows[0],
    });
  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

const updateCategryChoosenUser = async (req, res) => {
  const { id, category, user_id } = req.body;
  //console.log(id, category, user_id);
  try {
    const updatedCategory = await db.query(
      "UPDATE category SET category = $1,  user_id= $2  WHERE id = $3 RETURNING *",
      [category, user_id, id]
    );
    res.status(200).json({
      success: `Category ${updatedCategory.rows[0].category} updated`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategryChoosenUser = async (req, res) => {
  const { category_id } = req.params;
  try {
    const result = await db.query(" DELETE FROM category WHERE id = $1", [
      category_id,
    ]);
    if (result.rowCount === 0)
      return res
        .status(404)
        .json({ message: "Categories were not found", ok: false });

    return res.status(200).json({
      message: `Deleted items with category_id ${category_id}`,
      ok: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllCategories,
  getAllCategriesUser,
  addCategoryForUser,
  updateCategryChoosenUser,
  deleteCategryChoosenUser,
};
