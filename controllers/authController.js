import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwtTokens from "../utils/jwt-helpers.js";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //
  console.log(req.cookies, req.get("origin"));
  if (!email || !password)
    return res.status(400).json({ message: "Email and password is required" });

  try {
    console.log(req.cookies, req.get("origin"));
    const foundUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log(foundUser.rows[0].email);

    if (foundUser.rows.length === 0) {
      //console.log("ok");
      return res.status(401).json({ error: "Email is incorrect" });
    }

    const match = await bcrypt.compare(password, foundUser.rows[0].password);
    //console.log(match);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    console.log(foundUser.rows[0].id);
    let tokens = jwtTokens(
      foundUser.rows[0].id,
      foundUser.rows[0].name,
      foundUser.rows[0].email
    );
    const id = foundUser.rows[0].id;
    const user_id = foundUser.rows[0].id;
    const name = foundUser.rows[0].name;

    await db.query("UPDATE users SET token = $1  WHERE id = $2 RETURNING *", [
      tokens.refreshToken,
      id,
    ]);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    //console.log(tokens, user_id);
    res.status(200).json({ accessToken: tokens.accessToken, user_id, name });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { handleLogin };
