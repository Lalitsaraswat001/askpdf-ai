const { IndexFlatL2 } = require("faiss-node");

const VECTOR_DIMENSION = 3072;

let index = new IndexFlatL2(VECTOR_DIMENSION);

let metadata = [];

/**
 * Reset FAISS index and metadata
 */
function resetVectorStore() {
  index = new IndexFlatL2(VECTOR_DIMENSION);
  metadata = [];

  console.log("🗑️ FAISS index reset");
}

/**
 * Store embeddings in FAISS
 */
async function storeEmbeddings(vectors) {
  for (const vector of vectors) {
    index.add(vector.embedding);

    metadata.push({
      pdfId: vector.pdfId,
      text: vector.text,
    });

    console.log(`✅ Stored ${vectors.length} vectors in FAISS`);
    console.log(`📊 Total vectors in FAISS: ${index.ntotal()}`);
    console.log(`📊 Metadata count: ${metadata.length}`);
  }
}

function getIndex() {
  return index;
}

function getMetadata() {
  return metadata;
}

module.exports = {
  storeEmbeddings,
  resetVectorStore,
  getIndex,
  getMetadata,
};