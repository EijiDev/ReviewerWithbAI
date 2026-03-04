import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ReviewerRoutes from "./routes/reviewer.routes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { testConnection } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// File upload/generate — 10 requests per hour (AI is expensive)
const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Upload limit reached. Please try again in an hour." },
});

// Ask follow-up — 30 requests per 15 minutes
const askLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many questions. Please slow down and try again." },
});

app.use("/api", generalLimiter);
app.use("/api/reviewer/generate", generateLimiter);
app.use("/api/reviewer/ask", askLimiter);

app.use("/api/reviewer", ReviewerRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

await testConnection();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;