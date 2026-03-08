import { useState } from "react";
import { API_BASE } from "../../api/Api";

export function useFollowUp(sessionId) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_BASE}/reviewer/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, question }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || "Medyo nalito ang AI. Try again.");
    } catch {
      setAnswer("Hindi ma-reach ang server. Check mo connection mo.");
    } finally {
      setLoading(false);
    }
  };

  return { question, setQuestion, answer, loading, ask };
}