const isProd = process.env.NODE_ENV === "production";

export function errorHandler(err, req, res, next) {
  console.error("Full error:", err);

  if (err.message?.includes("Invalid file type")) {
    return res.status(415).json({ error: err.message });
  }

  if (err.message?.includes("File too large") || err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      error: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB || 10}MB.`,
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }

  res.status(500).json({
    error: "Something went wrong. Please try again.",
    ...(isProd ? {} : { details: err.message }), 
  });
}