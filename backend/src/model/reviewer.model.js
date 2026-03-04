import { pool } from "../config/database.js";

export async function createSession({
  fileName,
  fileType,
  extractedText,
  review,
}) {
  const { rows } = await pool.query(
    `INSERT INTO reviewer_sessions 
      (file_name, file_type, original_text, explanation, key_points, quiz_questions)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, created_at`,
    [
      fileName,
      fileType,
      extractedText.slice(0, 50000),
      review.explanation,
      JSON.stringify(review.keyPoints),
      JSON.stringify(review.quizQuestions),
    ],
  );
  return rows[0];
}

export async function findSessionById(id) {
  const { rows } = await pool.query(
    `SELECT id, file_name, file_type, original_text, explanation, key_points, quiz_questions, created_at
     FROM reviewer_sessions WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function getAllSessions() {
  const { rows } = await pool.query(
    `SELECT id, file_name, file_type, created_at
     FROM reviewer_sessions
     ORDER BY created_at DESC
     LIMIT 20`,
  );
  return rows;
}