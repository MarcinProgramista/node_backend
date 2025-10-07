import pg from "pg";
import env from "dotenv";

env.config();

export const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Poprawiona obsługa połączenia
db.connect()
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Obsługa nieoczekiwanych błędów połączenia
db.on("error", (err) => {
  console.error("Unexpected database error:", err);
  process.exit(1);
});

export default db;
