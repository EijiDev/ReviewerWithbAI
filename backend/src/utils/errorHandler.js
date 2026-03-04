export function errorHandler(err, req, res, next) {
  console.error("Full error:", err); // shows the real problem
  
  if (err.message?.includes("Invalid file type")) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message?.includes("File too large")) {
    return res.status(400).json({ error: "File is too large. Maximum size is 20MB." });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }

  res.status(500).json({
    error: "Something went wrong. Please try again.",
    details: err.message, // always show details so you can debug
  });
}