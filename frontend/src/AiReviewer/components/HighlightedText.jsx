export function HighlightedText({ text, highlight }) {
  if (!text) return null;

  const regex = new RegExp(
    `(${highlight}|\\*\\*[^*]+\\*\\*|[A-Z]{3,}|[A-Z][a-z]+(?:\\s[A-Z][a-z]+)+)`,
    "g"
  );

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (highlight && part.toLowerCase() === highlight.toLowerCase()) {
          return (
            <mark key={i} className="bg-yellow-200 text-yellow-900 font-semibold px-1 rounded">
              {part}
            </mark>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={i} className="bg-indigo-100 text-indigo-800 font-semibold px-1 rounded">
              {part.slice(2, -2)}
            </mark>
          );
        }

        if (/^[A-Z]{3,}$/.test(part)) {
          return (
            <mark key={i} className="bg-green-100 text-green-800 font-semibold px-1 rounded">
              {part}
            </mark>
          );
        }

        if (/^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/.test(part)) {
          return (
            <mark key={i} className="bg-purple-100 text-purple-800 font-semibold px-1 rounded">
              {part}
            </mark>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}