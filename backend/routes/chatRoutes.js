const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  chatWithPDF,
  getChatHistory,
  generatePDFSummary,
} = require("../controllers/chatController");

/**
 * Ask Question
 */
router.post(
  "/",
  authMiddleware,
  chatWithPDF
);

/**
 * Generate AI Summary
 */
router.post(
  "/summary",
  authMiddleware,
  generatePDFSummary
);

/**
 * Get Chat History
 */
router.get(
  "/history/:pdfId",
  authMiddleware,
  getChatHistory
);

module.exports = router;