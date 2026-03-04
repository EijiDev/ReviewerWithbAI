
export function HighlightedText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*|[A-Z]{3,})/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <mark key={i} className="bg-indigo-100 text-indigo-800 font-semibold px-1 rounded not-italic">
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
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}