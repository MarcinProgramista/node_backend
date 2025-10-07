import { db } from "../db.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log(req.body);

  if (!email || !password)
    return res.status(400).json({ message: "Email and password is required" });

  if (JSON.stringify(password).length - 2 < 6)
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters" });

  if (password !== password2)
    return res.status(400).json({ message: "Passwords should match!" });

  try {
    const duplicate = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (duplicate.rowCount !== 0)
      return res.status(409).json({ message: "Email already exist" });

    try {
      const hashedPassowrd = await bcrypt.hash(password, 10);
        
      const newUser = await db.query(
        "INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *",
        [name, email, hashedPassowrd]
      );
      console.log(newUser);
      
      res
        .status(201)
        .json({ success: `New user ${newUser.rows[0].email} created` });
      
      
      
      try {
        await db.query(
          "INSERT INTO category (user_id, category) VALUES($1,$2),($1,$3),($1,$4)  RETURNING *",
          [newUser.rows[0].id, "Films", "Books", "Notes"]
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register };
