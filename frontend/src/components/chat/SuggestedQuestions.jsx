import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Calendar,
  ListChecks,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const questions = [
  {
    icon: Sparkles,
    title: "Summarize this PDF",
    prompt: "Summarize this PDF in simple points.",
  },
  {
    icon: FileText,
    title: "Key Topics",
    prompt: "What are the main topics discussed in this PDF?",
  },
  {
    icon: Calendar,
    title: "Important Dates",
    prompt: "List all important dates mentioned in this PDF.",
  },
  {
    icon: ListChecks,
    title: "Key Points",
    prompt: "Give me the key points from this document.",
  },
  {
    icon: HelpCircle,
    title: "Explain Simply",
    prompt: "Explain this document in simple language.",
  },
];

function SuggestedQuestions({ onSelect }) {
  const { darkMode } = useTheme();

  return (
    <div className="h-full flex flex-col items-center justify-center px-8">

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-2xl mb-6">
        <Sparkles className="text-white" size={36} />
      </div>

      <h2
        className={`text-2xl font-bold ${darkMode
            ? "text-white"
            : "text-slate-900"
          }`}
      >
        How can I help?
      </h2>

      <p
        className={`mt-2 mb-8 text-center ${darkMode
            ? "text-gray-400"
            : "text-slate-600"
          }`}
      >
        Choose one of the suggestions below.
      </p>

      <div className="grid gap-4 w-full max-w-2xl">
        {questions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => onSelect(item.prompt)}
              className={`flex items-center gap-4 rounded-2xl border transition-all px-5 py-4 text-left ${darkMode
                  ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50"
                  : "border-slate-200 bg-white hover:bg-slate-50 hover:border-violet-400 shadow-sm"
                }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Icon className="text-white" size={22} />
              </div>

              <div>
                <h3
                  className={`font-semibold ${darkMode
                      ? "text-white"
                      : "text-slate-900"
                    }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm mt-1 ${darkMode
                      ? "text-gray-400"
                      : "text-slate-600"
                    }`}
                >
                  {item.prompt}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}

export default SuggestedQuestions;