import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ status:"Server is running", timestamp: new Date()});
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found"});
})

app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})