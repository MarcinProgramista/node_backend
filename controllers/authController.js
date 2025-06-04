import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwtTokens from "../utils/jwt-helpers.js";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password)
    return res.status(400).json({ message: "Email and password is required" });

  try {
    const foundUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (foundUser.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });

    const match = await bcrypt.compare(password, foundUser.rows[0].password);

    if (!match) return res.status(401).json({ error: "Incorrect password" });
    //console.log(foundUser.rows[0].id);
    let tokens = jwtTokens(
      foundUser.rows[0].id,
      foundUser.rows[0].name,
      foundUser.rows[0].email
    );
    try {
      const updatedUser = await db.query(
        "UPDATE users SET token = $1 WHERE id = $2 RETURNING *",
        [tokens.refreshToken, foundUser.rows[0].id]
      );
      //console.log(updatedUser.rows[0]);
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(tokens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { handleLogin };
