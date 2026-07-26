import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import {
  askQuestion,
  generateSummary,
} from "../../services/chatService";

import { getChatHistory } from "../../services/chatHistoryService";

import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";

function ChatWindow({ selectedPdf, onSourceClick }) {
  const { darkMode } = useTheme();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Load Chat History
  useEffect(() => {
    const loadHistory = async () => {
      if (!selectedPdf) {
        setMessages([]);
        setQuestion("");
        return;
      }

      try {
        const response = await getChatHistory(selectedPdf._id);

        const history = [];

        response.chats.forEach((chat) => {
          history.push({
            sender: "user",
            text: chat.question,
          });

          history.push({
            sender: "bot",
            text: chat.answer,
            sources: [],
          });
        });

        setMessages(history);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    };

    loadHistory();
  }, [selectedPdf]);

  // Ask Question
  const handleSend = async () => {
    if (!question.trim() || !selectedPdf || loading) return;

    const userQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await askQuestion(
        selectedPdf._id,
        userQuestion
      );

      const fullAnswer =
        response.answer ||
        response.response ||
        "No answer returned.";

      const sources = response.sources || [];

      // Create empty bot message
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "",
          sources,
          isStreaming: true,
        },
      ]);

      const words = fullAnswer.split(" ");

      let currentText = "";

      for (let i = 0; i < words.length; i++) {
        currentText +=
          (i === 0 ? "" : " ") + words[i];

        await new Promise((resolve) =>
          setTimeout(resolve, 25)
        );

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: currentText,
            isStreaming: i !== words.length - 1,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Something went wrong while generating the answer.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generate Summary
  const handleSummary = async () => {
    if (!selectedPdf || loading) return;

    setLoading(true);

    try {
      const response = await generateSummary(
        selectedPdf._id
      );

      const summary = response.summary;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "",
          sources: [],
          isStreaming: true,
        },
      ]);

      const words = summary.split(" ");

      let current = "";

      for (let i = 0; i < words.length; i++) {
        current +=
          (i === 0 ? "" : " ") + words[i];

        await new Promise((resolve) =>
          setTimeout(resolve, 20)
        );

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: current,
            isStreaming: i !== words.length - 1,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to generate summary.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full rounded-3xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#0F172A]" : "bg-white"
        }`}
    >
      {/* Header */}
      <ChatHeader
        selectedPdf={selectedPdf}
        loading={loading}
        onSummary={handleSummary}
      />

      {/* Chat Area */}
      <div
        className={`flex-1 overflow-y-auto px-6 py-6 transition-colors duration-300 ${darkMode ? "bg-[#0F172A]" : "bg-slate-50"
          }`}
      >
        {!selectedPdf ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Bot
              size={70}
              className="text-violet-500 mb-5"
            />

            <h2
              className={`text-2xl font-bold ${darkMode
                ? "text-white"
                : "text-slate-900"
                }`}
            >
              Welcome to AskPDF AI
            </h2>

            <p
              className={`mt-3 max-w-md ${darkMode
                ? "text-gray-400"
                : "text-slate-600"
                }`}
            >
              Upload or select a PDF from the sidebar to start chatting with your document.
            </p>
          </div>
        ) : messages.length === 0 ? (
          <SuggestedQuestions
            onSelect={(prompt) => setQuestion(prompt)}
          />
        ) : (
          <>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message}
                  onSourceClick={onSourceClick}
                />
              ))}

              {loading && <TypingIndicator />}
            </div>

            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput
        input={question}
        setInput={setQuestion}
        handleSend={handleSend}
        loading={loading || !selectedPdf}
      />
    </div>
  );
}

export default ChatWindow;