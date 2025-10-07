import { db } from "../db.js";
import jwtTokens from "../utils/jwt-helpers.js";
import jwt from "jsonwebtoken";

const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const foundUser = await db.query("SELECT * FROM users WHERE token = $1", [
      refreshToken,
    ]);

    if (foundUser.rows.length === 0) {
      return res.sendStatus(403);
    }

    const user = foundUser.rows[0];

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) return res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: user.id,
              email: user.email,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getRefreshToken };
