import express from "express";
import { logger } from "./middleware/logEvents.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3700;
app.use(logger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
