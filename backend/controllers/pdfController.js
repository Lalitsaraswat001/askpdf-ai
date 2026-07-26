const fs = require("fs");
const path = require("path");
const Embedding = require("../models/Embedding");

const Pdf = require("../models/Pdf");
const { extractTextFromPDF } = require("../services/pdfParser");
const { splitText } = require("../services/chunkService");
const { generateEmbeddings } = require("../services/embeddingService");
const { saveEmbeddings } = require("../services/embeddingStorageService");
const { storeEmbeddings, getIndex } = require("../services/vectorStore");

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded.",
      });
    }

    // Save PDF details
    const pdf = await Pdf.create({
      filename: req.file.originalname,
      filepath: req.file.filename,
      uploadedBy: req.user.id,
    });

    // Extract text
    // Extract page-wise text
    const extractedPages = await extractTextFromPDF(req.file.path);

    if (
      !extractedPages ||
      extractedPages.length === 0 ||
      extractedPages.every((page) => !page.text.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "No readable text found in the PDF.",
      });
    }

    // Split pages into chunks
    const chunks = await splitText(extractedPages);

    // Generate embeddings
    const vectors = await generateEmbeddings(chunks);

    // Attach pdfId to every vector
    const vectorsWithPdfId = vectors.map((vector) => ({
      ...vector,
      pdfId: pdf._id.toString(),
    }));

    // Save embeddings to MongoDB
    await saveEmbeddings(pdf._id, req.user.id, vectorsWithPdfId);

    // Store embeddings in FAISS
    await storeEmbeddings(vectorsWithPdfId);

    return res.status(201).json({
      success: true,
      message: "PDF processed successfully",
      pdf: {
        id: pdf._id,
        filename: pdf.filename,
      },
      statistics: {
        textLength: extractedPages.reduce(
          (total, page) => total + page.text.length,
          0
        ),
        totalPages: extractedPages.length,
        totalChunks: chunks.length,
        totalEmbeddings: vectors.length,
        embeddingDimension: vectors[0].embedding.length,
        storedInMongoDB: vectors.length,
        vectorsInFAISS: getIndex().ntotal(),
      },
    });

  } catch (error) {
    console.error("========== PDF Upload Error ==========");
    console.error(error);
    console.error(error.stack);
    console.error("======================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete PDF
exports.deletePDF = async (req, res) => {
  try {
    const { id } = req.params;

    // Find PDF
    const pdf = await Pdf.findOne({
      _id: id,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found.",
      });
    }

    // Delete uploaded file
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      pdf.filepath
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete embeddings
    await Embedding.deleteMany({
      pdfId: pdf._id,
    });

    // Delete PDF document
    await Pdf.findByIdAndDelete(pdf._id);

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully.",
    });

  } catch (error) {
    console.error("========== Delete PDF Error ==========");
    console.error(error);
    console.error(error.stack);
    console.error("======================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all PDFs uploaded by logged-in user
exports.getUserPDFs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      uploadedBy: req.user.id,
    })
      .select("_id filename filepath createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });

  } catch (error) {
    console.error("Get PDFs Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};