import dotenv from "dotenv";
import express from "express";
import path from "path";
// @ts-ignore: helmet module may not have local type declarations
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.set("trust proxy", 1);
const port = 3000;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(helmet());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin: "https://yourdomain.com", // Avoid '*' in production for security
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

import authRoutes from "./routes/auth.route.ts";
import userRoutes from "./routes/user.route.ts";
import linkRoutes from "./routes/link.route.ts";
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", linkRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
