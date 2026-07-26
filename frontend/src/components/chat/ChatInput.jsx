import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

function ChatInput({
  input,
  setInput,
  handleSend,
  loading,
}) {
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  const { darkMode } = useTheme();

  const [isListening, setIsListening] =
    useState(false);

  const voiceInputEnabled =
    JSON.parse(
      localStorage.getItem("voiceInput")
    ) ?? true;

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [input]);

  useEffect(() => {
    if (!voiceInputEnabled) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn(
        "Speech Recognition not supported."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput((prev) =>
        prev
          ? prev + " " + transcript
          : transcript
      );
    };

    recognitionRef.current =
      recognition;
  }, [voiceInputEnabled, setInput]);

  const toggleListening = () => {
    if (!voiceInputEnabled) {
      alert(
        "Voice Input is disabled. Enable it from Settings."
      );
      return;
    }

    if (!recognitionRef.current) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (input.trim() && !loading) {
        handleSend();
      }
    }
  };

  return (
    <>
      <div
        className={`border-t p-5 transition-colors duration-300 ${darkMode
          ? "border-white/10 bg-[#0F172A]"
          : "border-slate-200 bg-white"
          }`}
      >
        <div
          className={`
        flex
        items-end
        gap-3
        rounded-3xl
        border
        backdrop-blur-xl
        px-4
        py-3
        shadow-xl
        transition-all
        duration-300

        ${darkMode
              ? "bg-white/5 border-white/10 focus-within:border-violet-500"
              : "bg-slate-50 border-slate-300 focus-within:border-violet-500"
            }
      `}
        >
          {/* Attachment */}

          <button
            disabled
            className={`
          p-2
          rounded-xl
          transition

          ${darkMode
                ? "text-slate-400 hover:bg-white/10 hover:text-white"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              }
        `}
          >
            <Paperclip size={18} />
          </button>

          {/* Input */}

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={2000}
            placeholder={
              isListening
                ? "🎤 Listening..."
                : "Ask anything about this document..."
            }
            className={`
          flex-1
          resize-none
          bg-transparent
          outline-none
          leading-7
          max-h-40
          overflow-y-auto

          ${darkMode
                ? "text-white placeholder:text-slate-500"
                : "text-slate-900 placeholder:text-slate-400"
              }
        `}
          />

          {/* Voice */}

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            animate={
              isListening
                ? {
                  scale: [1, 1.15, 1],
                }
                : {
                  scale: 1,
                }
            }
            transition={{
              repeat: isListening
                ? Infinity
                : 0,
              duration: 1,
            }}
            onClick={toggleListening}
            className={`
          p-2
          rounded-xl
          transition

          ${isListening
                ? "bg-red-500 text-white shadow-lg"
                : darkMode
                  ? "text-slate-400 hover:bg-white/10 hover:text-white"
                  : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              }
        `}
          >
            <Mic size={18} />
          </motion.button>

          {/* Send */}

          <motion.button
            whileHover={{
              scale: loading ? 1 : 1.05,
            }}
            whileTap={{
              scale: loading ? 1 : 0.95,
            }}
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="
          w-11
          h-11
          rounded-2xl
          flex
          items-center
          justify-center
          bg-gradient-to-r
          from-violet-600
          to-blue-600
          text-white
          shadow-lg
          transition-all
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
          >
            <SendHorizontal size={18} />
          </motion.button>
        </div>

        {/* Footer */}

        <div
          className={`mt-3 flex items-center justify-between text-xs ${darkMode
            ? "text-slate-500"
            : "text-slate-500"
            }`}
        >
          <span>
            {isListening
              ? "🎤 Listening... Speak now."
              : "Press Enter to send • Shift + Enter for a new line"}
          </span>

          <div className="flex items-center gap-4">
            <span>{input.length}/2000</span>

            {isListening && (
              <span className="text-red-500 font-semibold animate-pulse">
                Recording...
              </span>
            )}

            <span className="font-semibold">
              AskPDF AI
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatInput;