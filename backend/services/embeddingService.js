const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-embedding-001",
});

async function generateEmbeddings(chunks) {
  // Generate embeddings for all chunk texts
  const vectors = await embeddings.embedDocuments(
    chunks.map((chunk) => chunk.text)
  );

  return chunks.map((chunk, index) => ({
    text: chunk.text,
    embedding: vectors[index],
    pageNumber: chunk.pageNumber,
    chunkIndex: chunk.chunkIndex,
  }));
}

module.exports = {
  generateEmbeddings,
};