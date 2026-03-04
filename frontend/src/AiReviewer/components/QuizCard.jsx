import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { HighlightedText } from "./HighlightedText";

export function QuizCard({ question, choices, answer, explanation }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (choice) => {
    if (revealed) return;
    setSelected(choice);
    setRevealed(true);
  };

  const getStyle = (choice) => {
    const isCorrect = choice === answer;
    const isSelected = choice === selected;
    if (revealed && isCorrect)
      return "border-green-400 bg-green-50 text-green-800 ring-2 ring-green-100";
    if (revealed && isSelected && !isCorrect)
      return "border-red-400 bg-red-50 text-red-700 ring-2 ring-red-100";
    return "border-gray-200 bg-gray-50 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50";
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-800 mb-4">{question}</p>
      <div className="space-y-2">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleSelect(choice)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-2 font-medium ${getStyle(choice)}`}
          >
            {revealed && choice === answer && (
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
            )}
            {revealed && choice === selected && choice !== answer && (
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            {choice}
          </button>
        ))}
      </div>
      {revealed && (
        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-blue-100 text-xs text-green-800 leading-relaxed">
          <span className="font-bold block mb-1">Explanation:</span>
          <HighlightedText text={explanation} />
        </div>
      )}
    </div>
  );
}
