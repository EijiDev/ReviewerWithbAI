import { extractText } from "../utils/fileParser.js";
import { generateReview, askFollowUp } from "../utils/geminiService.js";
import {
  createSession,
  findSessionById,
  getAllSessions,
} from "../model/reviewer.model.js";

export async function generateReviewer(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { originalname, buffer } = req.file;
    const ext = originalname.split(".").pop().toLowerCase();

    console.log(`Processing file: ${originalname} (${ext})`);

    let extractedText;
    try {
      extractedText = await extractText(buffer, originalname);
    } catch (parseErr) {
      return res
        .status(422)
        .json({ error: `Could not read file: ${parseErr.message}` });
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(422).json({
        error: "The file doesn't seem to have enough text content to review.",
      });
    }

    //Generate AI review
    let review;
    try {
      review = await generateReview(extractedText, originalname);
    } catch (aiError) {
      const status =
        aiError.errorType === "INVALID_KEY" ? 403
        : aiError.errorType === "QUOTA_EXCEEDED" ? 429
        : aiError.errorType === "OVERLOADED" ? 503
        : 500;
      return res.status(status).json({ error: aiError.message });
    }

    const session = await createSession({
      fileName: originalname,
      fileType: ext,
      extractedText,
      review,
    });

    res.json({
      sessionId: session.id,
      createdAt: session.created_at,
      fileName: originalname,
      review,
    });
  } catch (err) {
    next(err);
  }
}

export async function askQuestion(req, res, next) {
  try {
    const { sessionId, question } = req.body;

    if (!sessionId || !question?.trim()) {
      return res
        .status(400)
        .json({ error: "sessionId and question are required." });
    }

    const session = await findSessionById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    const answer = await askFollowUp(
      question,
      session.original_text,
      session.explanation,
    );

    res.json({ answer });
  } catch (err) {
    next(err);
  }
}

export async function getSessions(req, res, next) {
  try {
    const sessions = await getAllSessions();
    res.json({ sessions });
  } catch (err) {
    next(err);
  }
}

export async function getSession(req, res, next) {
  try {
    const session = await findSessionById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    res.json({
      sessionId: session.id,
      fileName: session.file_name,
      fileType: session.file_type,
      createdAt: session.created_at,
      review: {
        explanation: session.explanation,
        keyPoints: session.key_points,
        quizQuestions: session.quiz_questions,
      },
    });
  } catch (err) {
    next(err);
  }
}