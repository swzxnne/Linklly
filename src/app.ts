import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

import authRoutes from "./routes/auth.route.ts";
import userRoutes from "./routes/user.route.ts";
import linkRoutes from "./routes/link.route.ts";
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", linkRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
