import { Router } from "express";
import { upload } from "../utils/upload.js";
import {
  generateReviewer,
  askQuestion,
  getSessions,
  getSession,
} from "../controller/reviewerController.js";

const router = Router();

router.post("/generate", upload.single("file"), generateReviewer);
router.post("/ask", askQuestion)  
router.get("/sessions", getSessions);
router.get("/sessions/:id", getSession);

export default router;
