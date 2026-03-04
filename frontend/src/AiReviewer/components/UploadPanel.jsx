import { Upload } from "lucide-react";

export function UploadPanel({ file, loading, inputRef, onFileChange, onDrop }) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDrop(e, true); }}
      onDragLeave={() => onDrop(null, false)}
      onDrop={(e) => { e.preventDefault(); onDrop(e, false, true); }}
      onClick={() => !loading && inputRef.current.click()}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all min-h-52 p-10 shadow-sm
        ${loading ? "opacity-50 cursor-not-allowed" : "border-gray-200 bg-white hover:border-green-700 hover:shadow-md"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.pptx"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files[0])}
        disabled={loading}
      />
      <Upload className="w-10 h-10 mb-4 text-gray-400" strokeWidth={1.5} />
      {file ? (
        <>
          <p className="text-sm font-bold text-gray-800 text-center break-all">{file.name}</p>
          <p className="text-xs text-green-900 mt-2 font-medium">
            {loading ? "Processing..." : "Tap to change file"}
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-gray-700">Drag & drop your file here</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or PPTX (Max 20MB)</p>
        </>
      )}
    </div>
  );
}