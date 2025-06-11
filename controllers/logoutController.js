import { db } from "../db.js";

const handleLogout = async (req, res) => {
  //on clinet, alos delate the accessToken
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken);
    if (refreshToken === null) return res.status(204);
    try {
      const foundUser = await db.query("SELECT * FROM users WHERE token =$1", [
        refreshToken,
      ]);
      if (!foundUser) {
        res.clearCookie("refresh_token");
        return res.status(204);
      }
      // delete refreshToken in db
      console.log(foundUser.rows);

      try {
        await db.query(
          "UPDATE users SET token = $1 WHERE id = $2 RETURNING *",
          ["", foundUser.rows[0].id]
        );
        res.clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        return res.status(200).json({ message: "deleted" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export { handleLogout };
