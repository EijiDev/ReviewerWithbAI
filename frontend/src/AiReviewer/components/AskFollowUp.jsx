import { HelpCircle, Send, Loader2 } from "lucide-react";
import { useFollowUp } from "../hooks/useFollowUp";

export function AskFollowUp({ sessionId }) {
  const { question, setQuestion, answer, loading, ask } =
    useFollowUp(sessionId);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-green-800" />
        <h3 className="text-sm font-bold text-gray-800">
          May hindi ka ba naintindihan? Itanong mo!
        </h3>
      </div>
      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="e.g. 'Ano ulit yung HTML Tag?'"
          className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
        />
        <button
          onClick={ask}
          disabled={loading || !question.trim()}
          className="shrink-0 bg-green-900 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl px-5 py-3 transition-all shadow-md active:scale-95"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      {answer && (
        <div className="mt-4 p-5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          <p className="font-bold text-green-800 text-xs uppercase tracking-wider mb-2">
            Sagot ni Prof. AI:
          </p>
          {typeof answer === "object" ? answer.explanation : answer}
        </div>
      )}
    </div>
  );
}
