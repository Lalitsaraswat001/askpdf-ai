const Chat = require("../models/chat");

const { saveChat } = require("../services/chatHistoryService");

const {
  searchSimilarChunks,
  getAllChunks,
} = require("../services/searchService");

const {
  generateAnswer,
  generateSummary,
} = require("../services/geminiService");

/**
 * Get Chat History
 */
exports.getChatHistory = async (req, res) => {
  try {
    const { pdfId } = req.params;

    const chats = await Chat.find({
      userId: req.user.id,
      pdfId,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      chats,
    });

  } catch (error) {
    console.error("Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Ask Question
 */
exports.chatWithPDF = async (req, res) => {
  try {
    const { question, pdfId } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required.",
      });
    }

    console.log("Searching PDF:", pdfId);

    const retrievedChunks = await searchSimilarChunks(
      question.trim(),
      pdfId
    );

    if (!retrievedChunks.length) {
      return res.status(200).json({
        success: true,
        answer:
          "I couldn't find that information in the uploaded PDF.",
        sources: [],
      });
    }

    const answer = await generateAnswer(
      question.trim(),
      retrievedChunks
    );

    await saveChat(
      req.user.id,
      pdfId,
      question.trim(),
      answer
    );

    return res.status(200).json({
      success: true,
      answer,
      sources: retrievedChunks,
    });

  } catch (error) {
    console.error("Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate PDF Summary
 */
exports.generatePDFSummary = async (req, res) => {
  try {
    const { pdfId } = req.body;

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required.",
      });
    }

    console.log("Generating summary for:", pdfId);

    // Get all chunks of this PDF
    const chunks = await getAllChunks(pdfId);

    const summary = await generateSummary(chunks);

    return res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error("Summary Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};