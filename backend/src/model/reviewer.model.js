import { pool } from "../config/database.js";

export const ReviewerSession = {
  /**
   * Create a new review session
   */
  async create({ fileName, fileType, originalText, explanation, keyPoints, quizQuestions }) {
    const query = `
      INSERT INTO reviewer_sessions 
        (file_name, file_type, original_text, explanation, key_points, quiz_questions)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at;
    `;
    const values = [
      fileName,
      fileType,
      originalText.slice(0, 50000),
      explanation,
      JSON.stringify(keyPoints),
      JSON.stringify(quizQuestions),
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  /**
   * Find a session by ID with specific fields
   */
  async findById(id, fields = "*") {
    const query = `SELECT ${fields} FROM reviewer_sessions WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  /**
   * Get recent sessions for the list view
   */
  async getRecent(limit = 20) {
    const query = `
      SELECT id, file_name, file_type, created_at
      FROM reviewer_sessions
      ORDER BY created_at DESC
      LIMIT $1
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
  }
};