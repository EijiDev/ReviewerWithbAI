import { extractText } from "../utils/fileParser.js";
import { generateReview, askFollowUp } from "../utils/geminiService.js";
import { pool } from "../config/database.js";

/**
 * POST /api/reviewer/generate
 * Upload a file and generate a Taglish Feynman review
 */
export async function generateReviewer(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { originalname, buffer, mimetype } = req.file;
    const ext = originalname.split(".").pop().toLowerCase();

    console.log(`Processing file: ${originalname} (${ext})`);

    // 1. Extract text from file
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

    // 2. Generate AI review
    const review = await generateReview(extractedText, originalname);

    // 3. Save session to DB
    const { rows } = await pool.query(
      `INSERT INTO reviewer_sessions 
        (file_name, file_type, original_text, explanation, key_points, quiz_questions)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        originalname,
        ext,
        extractedText.slice(0, 50000), // Store truncated version
        review.explanation,
        JSON.stringify(review.keyPoints),
        JSON.stringify(review.quizQuestions),
      ],
    );

    const session = rows[0];

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

/**
 * POST /api/reviewer/ask
 * Ask a follow-up question about a previously uploaded document
 */
export async function askQuestion(req, res, next) {
  try {
    const { sessionId, question } = req.body;

    if (!sessionId || !question?.trim()) {
      return res
        .status(400)
        .json({ error: "sessionId and question are required." });
    }

    // Fetch session from DB
    const { rows } = await pool.query(
      "SELECT original_text, explanation FROM reviewer_sessions WHERE id = $1",
      [sessionId],
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Session not found." });
    }

    const { original_text, explanation } = rows[0];

    const answer = await askFollowUp(question, original_text, explanation);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/reviewer/sessions
 * Get list of past review sessions
 */
export async function getSessions(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT id, file_name, file_type, created_at
       FROM reviewer_sessions
       ORDER BY created_at DESC
       LIMIT 20`,
    );
    res.json({ sessions: rows });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/reviewer/sessions/:id
 * Get a specific review session
 */
export async function getSession(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT id, file_name, file_type, explanation, key_points, quiz_questions, created_at
       FROM reviewer_sessions WHERE id = $1`,
      [id],
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Session not found." });
    }

    const s = rows[0];
    res.json({
      sessionId: s.id,
      fileName: s.file_name,
      fileType: s.file_type,
      createdAt: s.created_at,
      review: {
        explanation: s.explanation,
        keyPoints: s.key_points,
        quizQuestions: s.quiz_questions,
      },
    });
  } catch (err) {
    next(err);
  }
}
