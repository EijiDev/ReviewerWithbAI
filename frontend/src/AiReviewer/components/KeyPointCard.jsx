import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HighlightedText } from "./HighlightedText";

export function KeyPointCard({ point, explanation, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-800">{point}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-indigo-50/50 text-sm text-gray-700 leading-relaxed border-t border-indigo-100">
          <HighlightedText text={explanation} />
        </div>
      )}
    </div>
  );
}
