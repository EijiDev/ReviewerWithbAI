import { Bot, Loader2, XCircle } from "lucide-react";

export function StatusPanel({ file, loading, error, result, onGenerate }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white min-h-52 p-10 shadow-sm text-center">
      <Bot
        className={`w-10 h-10 mb-4 ${loading ? "text-green-800 animate-bounce" : "text-gray-400"}`}
        strokeWidth={1.5}
      />
      <p className="text-sm font-bold text-gray-800 mb-1">
        {result ? "Lesson Reviewed!" : "Ready to Teach"}
      </p>
      <p className="text-xs text-gray-500 leading-relaxed px-4">
        {result
          ? `${result.review.keyPoints?.length || 0} key points found. Check the tabs below.`
          : "Wait generate lang ako ya..."}
      </p>

      {error && (
        <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
          <XCircle className="w-3 h-3" /> {error}
        </div>
      )}

      {file && !result && (
        <button
          onClick={onGenerate}
          disabled={loading}
          className="mt-6 flex items-center justify-center gap-2 bg-green-900 hover:bg-green-800 disabled:bg-gray-400 text-white w-full py-3 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Preparing Lessons...</>
          ) : (
            "Generate Review"
          )}
        </button>
      )}
    </div>
  );
}