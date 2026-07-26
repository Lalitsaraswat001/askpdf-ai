const Chat = require("../models/Chat");

/**
 * Save a chat conversation
 */
async function saveChat(userId, pdfId, question, answer) {
  return await Chat.create({
    userId,
    pdfId,
    question,
    answer,
  });
}

/**
 * Get complete chat history for one PDF
 */
async function getChatHistory(userId, pdfId) {
  return await Chat.find({
    userId,
    pdfId,
  }).sort({ createdAt: 1 });
}

/**
 * Delete chat history of a PDF
 */
async function deleteChatHistory(userId, pdfId) {
  return await Chat.deleteMany({
    userId,
    pdfId,
  });
}

module.exports = {
  saveChat,
  getChatHistory,
  deleteChatHistory,
};