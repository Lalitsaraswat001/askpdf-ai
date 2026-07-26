const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
  uploadPDF,
  getUserPDFs,
  deletePDF,
} = require("../controllers/pdfController");

// Upload PDF
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadPDF
);

// Get all PDFs
router.get("/", authMiddleware, getUserPDFs);

// Delete PDF
router.delete("/:id", authMiddleware, deletePDF);

module.exports = router;