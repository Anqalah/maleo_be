import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import RegisterRoute from "./routes/RegisterRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/register", RegisterRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Terjadi kesalahan server!");
});

const APP_PORT = process.env.APP_PORT;

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Sedang Berjalan di port ${APP_PORT}`);
});
