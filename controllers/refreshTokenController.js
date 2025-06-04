import { db } from "../db.js";
import jwtTokens from "../utils/jwt-helpers.js";
import jwt from "jsonwebtoken";

const getRefreshToken = async (req, res) => {
  //console.log(req.cookies.refresh_token);

  try {
    const refreshToken = req.cookies.refresh_token;
    const cookies = req.cookies;
    if (!cookies?.refresh_token) return res.sendStatus(401);

    try {
      const foundUser = await db.query("SELECT * FROM users WHERE token =$1", [
        refreshToken,
      ]);

      if (!foundUser) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) return res.sendStatus(403);
          let tokens = jwtTokens(user);
          res.json(tokens);
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { getRefreshToken };
