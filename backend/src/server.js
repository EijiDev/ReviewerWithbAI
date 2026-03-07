import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ReviewerRoutes from "./routes/reviewer.routes.js";
import { errorHandler } from "./utils/errorHandler.js";
import { testConnection } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests. Please try again later." },
});

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: "Upload limit reached. Please try again in an hour." },
});

const askLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Too many questions. Please slow down and try again." },
});

app.use("/api", generalLimiter);
app.use("/api/reviewer/generate", generateLimiter);
app.use("/api/reviewer/ask", askLimiter);

app.use("/api/reviewer", ReviewerRoutes);

app.get("/", (req, res) => {
  res.send("AI Reviewer API is running");
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

await testConnection();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;