import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const jwtTokens = ({ id, name, email }) => {
  const user = { id, name, email };

  const accessToken = jwt.sign(
    { username: name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
  const refreshToken = jwt.sign(
    { username: name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  return { accessToken, refreshToken };
};

export default jwtTokens;
