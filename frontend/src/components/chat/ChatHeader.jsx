import { Bot, FileText } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SummaryButton from "./SummaryButton";

function ChatHeader({
  selectedPdf,
  loading,
  onSummary,
}) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`border-b px-6 py-5 transition-colors duration-300 ${
        darkMode
          ? "bg-[#111827] border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">

        {/* Left */}

        <div className="flex items-center gap-4 min-w-0">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shrink-0">

            <Bot className="text-white" size={28} />

          </div>

          <div className="min-w-0">

            <h2
              className={`text-xl font-bold truncate ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {selectedPdf
                ? selectedPdf.filename
                : "AskPDF AI"}
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              {selectedPdf
                ? "Ask questions, generate summaries and explore your document."
                : "Upload a PDF to begin chatting with AI."}
            </p>

          </div>

        </div>

        {/* Right */}

        {selectedPdf && (
          <SummaryButton
            onClick={onSummary}
            loading={loading}
          />
        )}

      </div>

      {/* Document Info */}

      {selectedPdf && (
        <div className="mt-5 flex flex-wrap gap-3">

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium ${
              darkMode
                ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
                : "bg-violet-50 border-violet-200 text-violet-700"
            }`}
          >
            <FileText size={16} />
            PDF Loaded
          </div>

          <div
            className={`inline-flex items-center px-4 py-2 rounded-xl border text-sm ${
              darkMode
                ? "bg-white/5 border-white/10 text-slate-300"
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}
          >
            AI Ready
          </div>

          <div
            className={`inline-flex items-center px-4 py-2 rounded-xl border text-sm ${
              darkMode
                ? "bg-white/5 border-white/10 text-slate-300"
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}
          >
            Chat History Enabled
          </div>

        </div>
      )}
    </div>
  );
}

export default ChatHeader;