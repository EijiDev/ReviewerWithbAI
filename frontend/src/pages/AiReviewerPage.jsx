import { useState, useRef } from "react";
import { Upload, Bot } from "lucide-react";

export default function AIReviewerPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); };
  const handleFileChange = (e) => { if (e.target.files[0]) setFile(e.target.files[0]); };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">AI Reviewer</h1>
        <p className="text-sm text-gray-400 mt-0.5">Upload your study materials and generate AI-powered reviewers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {/* Upload Panel */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all min-h-44 md:min-h-52 p-8 md:p-10
            ${dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"}`}
        >
          <input ref={inputRef} type="file" accept=".pdf,.docx,.pptx" className="hidden" onChange={handleFileChange} />
          <Upload className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 ${dragging ? "text-indigo-500" : "text-gray-400"}`} strokeWidth={1.5} />
          {file ? (
            <>
              <p className="text-sm font-semibold text-gray-700 text-center break-all">{file.name}</p>
              <p className="text-xs text-indigo-500 mt-1">Tap to change file</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-700">Drag & drop your file here</p>
              <p className="text-xs text-gray-400 mt-1">Accepts PDF, DOCX, PPTX</p>
            </>
          )}
        </div>

        {/* Bot Panel */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white min-h-44 md:min-h-52 p-8 md:p-10">
          <Bot className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mb-3 md:mb-4" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-gray-700 mb-1">Upload a file to get started</p>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            AI will generate simplified explanations, Taglish versions, key points, and quiz questions.
          </p>
          {file && (
            <button className="mt-5 md:mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
              Generate Review
            </button>
          )}
        </div>
      </div>
    </main>
  );
}