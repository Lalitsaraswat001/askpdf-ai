import {
  FileText,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

function SourceCard({
  source,
  onSourceClick,
}) {
  const { darkMode } = useTheme();

  const preview =
    typeof source === "string"
      ? source
      : source?.text || "";

  const handleClick = () => {
    if (source?.pageNumber && onSourceClick) {
      onSourceClick(source.pageNumber);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.99,
      }}
      onClick={handleClick}
      className={`
        group
        cursor-pointer
        rounded-2xl
        border
        p-4
        transition-all
        duration-300
        backdrop-blur-md
        hover:shadow-xl

        ${
          darkMode
            ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-violet-500/40"
            : "bg-white border-slate-200 hover:bg-slate-50 hover:border-violet-300"
        }
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md">

            <FileText
              size={18}
              className="text-white"
            />

          </div>

          <div>

            <h4
              className={`font-semibold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Source Reference
            </h4>

            <p
              className={`text-xs ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Retrieved from your PDF
            </p>

          </div>

        </div>

        {source?.pageNumber && (
          <div
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-1.5
              border

              ${
                darkMode
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                  : "bg-violet-50 border-violet-200 text-violet-700"
              }
            `}
          >
            <BookOpen size={14} />

            <span className="text-xs font-semibold">
              Page {source.pageNumber}
            </span>
          </div>
        )}

      </div>

      {/* Preview */}

      <div
        className={`
          mt-4
          rounded-xl
          px-4
          py-3

          ${
            darkMode
              ? "bg-black/20"
              : "bg-slate-50"
          }
        `}
      >
        <p
          className={`text-sm leading-6 line-clamp-4 ${
            darkMode
              ? "text-slate-300"
              : "text-slate-700"
          }`}
        >
          {preview}
        </p>
      </div>

      {/* Footer */}

      {source?.pageNumber && (
        <div className="mt-5 flex justify-end">

          <div
            className="flex items-center gap-2 text-violet-500 font-medium transition-transform duration-300 group-hover:translate-x-1"
          >
            <span className="text-sm">
              View Page
            </span>

            <ArrowRight size={16} />
          </div>

        </div>
      )}

    </motion.div>
  );
}

export default SourceCard;