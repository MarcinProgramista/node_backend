import { db } from "../db.js";

const handleLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const foundUser = await db.query("SELECT * FROM users WHERE token = $1", [
      refreshToken,
    ]);

    if (foundUser.rows.length === 0) {
      res.clearCookie("refresh_token");
      return res.sendStatus(204);
    }

    // Clear token in database
    await db.query("UPDATE users SET token = NULL WHERE id = $1", [
      foundUser.rows[0].id,
    ]);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { handleLogout };
