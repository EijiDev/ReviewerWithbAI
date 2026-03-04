import { useReviewer } from "./hooks/useReviewer";
import { UploadPanel } from "./components/UploadPanel";
import { StatusPanel } from "./components/StatusPanel";
import { ReviewTabs } from "./components/ReviewTabs";
import { AskFollowUp } from "./components/AskFollowUp";

export default function AIReviewerPage() {
  const { file, loading, error, result, inputRef, selectFile, generate, reset } = useReviewer();

  const handleDrop = (e, isDragOver, isDrop) => {
    if (isDrop && e?.dataTransfer?.files[0]) selectFile(e.dataTransfer.files[0]);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto w-full">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-green-900">
              AI Powered
            </span>
            <span className="text-slate-900 mt-1"> Reviewer</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            I-upload mo na ’yan.{" "}
            <span className="font-semibold text-green-900">Walang bitaw</span>{" "}
            — para maintindihan mo, hindi lang mememorize,
            puro ka kabisado eh.
          </p>
        </div>

        {/* Upload + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <UploadPanel
            file={file}
            loading={loading}
            inputRef={inputRef}
            onFileChange={selectFile}
            onDrop={handleDrop}
          />
          <StatusPanel
            file={file}
            loading={loading}
            error={error}
            result={result}
            onGenerate={generate}
          />
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6"> 
            <ReviewTabs review={result.review} />
            <AskFollowUp sessionId={result.sessionId} />

            <div className="text-center pb-4">
              <button
                onClick={reset}
                className="text-xs text-gray-400 hover:text-green-700 transition-colors "
              >
                Upload another file
              </button>
            </div>
          </div>
        )}

        <div className="text-center py-6 mt-4">
          <p className="text-xs text-gray-400">
            Made by{" "}
            <a
              href="https://github.com/EijiDev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-900 hover:text-green-700 not-first:transition-colors underline underline-offset-2"
            >
              EijiDev
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}