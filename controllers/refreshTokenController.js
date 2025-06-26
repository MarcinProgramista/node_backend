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
      console.log(foundUser.rows[0].email);

      if (!foundUser) return res.status(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error) return res.staus(403);
          const accessToken = jwt.sign(
            {
              UserInfo: {
                email: decoded.email,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ accessToken: accessToken });
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
