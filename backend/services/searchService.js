const Embedding = require("../models/Embedding");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { IndexFlatL2 } = require("faiss-node");

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-embedding-001",
});

const VECTOR_DIMENSION = 3072;

/**
 * Semantic Search
 */
async function searchSimilarChunks(question, pdfId, topK = 5) {
  const questionEmbedding = await embeddings.embedQuery(question);

  const documents = await Embedding.find({ pdfId }).lean();

  if (!documents.length) {
    throw new Error("No embeddings found for this PDF.");
  }

  const index = new IndexFlatL2(VECTOR_DIMENSION);

  documents.forEach((doc) => {
    index.add(doc.embedding);
  });

  const result = index.search(
    questionEmbedding,
    Math.min(topK, documents.length)
  );

  const chunks = result.labels
    .filter((id) => id !== -1)
    .map((id) => ({
      text: documents[id].text,
      pageNumber: documents[id].pageNumber,
      chunkIndex: documents[id].chunkIndex,
    }));

  console.log("Retrieved Chunks:", chunks);

  return chunks;
}

/**
 * Get complete document text
 */
async function getAllChunks(pdfId) {
  const documents = await Embedding.find({ pdfId })
    .sort({ chunkIndex: 1 })
    .lean();

  if (!documents.length) {
    throw new Error("No embeddings found for this PDF.");
  }

  return documents.map((doc) => doc.text);
}

module.exports = {
  searchSimilarChunks,
  getAllChunks,
};