import { useState, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function useReviewer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  const selectFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    setError("");
  };

  const generate = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/reviewer/generate`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Quota Limit: Masyadong busy ang AI right now.");
        return;
      }

      setResult({
        sessionId: data.sessionId,
        fileName: file.name,
        review: data.review || data,
      });
    } catch {
      setError("Server Offline: Hindi ma-connect sa backend.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  return { file, loading, error, result, inputRef, selectFile, generate, reset };
}