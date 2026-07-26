import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import SourceCard from "./SourceCard";

function ChatBubble({ message, onSourceClick }) {
  const { darkMode } = useTheme();

  const isUser = message.sender === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`max-w-[78%] flex gap-3 ${isUser ? "flex-row-reverse" : ""
          }`}
      >
        {/* Avatar */}

        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg shrink-0 ${isUser
            ? "bg-gradient-to-br from-blue-500 to-cyan-500"
            : "bg-gradient-to-br from-violet-600 to-purple-600"
            }`}
        >
          {isUser ? (
            <User size={20} className="text-white" />
          ) : (
            <Bot size={20} className="text-white" />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`
            rounded-3xl
            px-5
            py-4
            border
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300

            ${isUser
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500"
              : darkMode
                ? "bg-[#111827] border-white/10 text-gray-100"
                : "bg-white border-slate-200 text-slate-800"
            }
          `}
        >
          {/* Header */}

          <div className="flex items-center justify-between mb-3">
            {isUser ? (
              <span className="text-xs font-semibold opacity-80">
                You
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">
                  AskPDF AI
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-600 text-white">
                  AI
                </span>
              </div>
            )}
          </div>

          {/* Message */}

          <div
            className={`prose max-w-none text-sm leading-7 ${darkMode ? "prose-invert" : ""
              }`}
          >
            <div className="inline">
              <ReactMarkdown>
                {message.text}
              </ReactMarkdown>

              {message.isStreaming && (
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  className="ml-1 font-bold text-violet-500 inline-block"
                >
                  ▌
                </motion.span>
              )}
            </div>
          </div>

          {/* Sources */}

          {!isUser &&
            !message.isStreaming &&
            message.sources &&
            message.sources.length > 0 && (
              <div className="mt-6">
                <p
                  className={`text-xs uppercase tracking-wider mb-3 ${darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                    }`}
                >
                  Sources
                </p>

                <div className="space-y-3">
                  {message.sources.map((source, index) => (
                    <SourceCard
                      key={index}
                      source={source}
                      onSourceClick={onSourceClick}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Footer */}

          {!isUser && !message.isStreaming && (
            <div className="flex justify-end mt-5">
              <button
                onClick={handleCopy}
                className={`
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  transition-all
                  duration-300

                  ${darkMode
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-slate-100 hover:bg-slate-200"
                  }
                `}
              >
                {copied ? (
                  <>
                    <Check
                      size={16}
                      className="text-green-500"
                    />

                    <span className="text-xs font-medium text-green-500">
                      Copied
                    </span>
                  </>
                ) : (
                  <>
                    <Copy
                      size={16}
                      className={
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-600"
                      }
                    />

                    <span
                      className={`text-xs font-medium ${darkMode
                        ? "text-slate-300"
                        : "text-slate-600"
                        }`}
                    >
                      Copy
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatBubble;