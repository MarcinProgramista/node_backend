import express from "express";
import path from "path";
import cors from "cors";
import { logger } from "./middleware/logEvents.js";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";
import { credentials } from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3700;

//custom middleware logger
app.use(logger);
app.use(credentials);
//Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
