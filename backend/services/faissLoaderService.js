const Embedding = require("../models/Embedding");
const {
    resetVectorStore,
    storeEmbeddings,
} = require("./vectorStore");

async function loadFAISSFromMongoDB() {
    try {
        console.log("🔄 Loading embeddings from MongoDB...");

        // Fetch all embeddings
        const embeddings = await Embedding.find().sort({
            pdfId: 1,
            chunkIndex: 1,
        });

        if (embeddings.length === 0) {
            console.log("📂 No embeddings found in MongoDB.");
            return;
        }

        // Reset FAISS before rebuilding
        resetVectorStore();

        // Convert MongoDB documents into vectors
        const vectors = embeddings.map((doc) => ({
            text: doc.text,
            embedding: Array.from(doc.embedding),
        }));

        // Rebuild FAISS
        await storeEmbeddings(vectors);

        console.log(`✅ Loaded ${vectors.length} embeddings into FAISS`);
    } catch (error) {
        console.error("❌ Error rebuilding FAISS:", error);
    }
}

module.exports = {
    loadFAISSFromMongoDB,
};