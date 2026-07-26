const Embedding = require("../models/Embedding");

async function saveEmbeddings(pdfId, uploadedBy, vectors) {
  const documents = vectors.map((vector) => ({
    pdfId,
    uploadedBy,

    text: vector.text,
    embedding: vector.embedding,

    pageNumber: vector.pageNumber,
    chunkIndex: vector.chunkIndex,
  }));

  await Embedding.insertMany(documents);

  console.log(`✅ Saved ${documents.length} embeddings to MongoDB`);
}

module.exports = {
  saveEmbeddings,
};