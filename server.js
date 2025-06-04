import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logEvents.js";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";
import { credentials } from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";
import usersRoute from "./routes/usersRoute.js";
import registerRoute from "./routes/registerRoute.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3700;

//custom middleware logger
app.use(logger);
app.use(credentials);
//Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRoute);
app.use("/api/register", registerRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
