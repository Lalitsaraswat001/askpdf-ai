const { ChatGroq } = require("@langchain/groq");

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.2,
});

// ------------------------------
// Question Answering
// ------------------------------
async function generateAnswer(question, retrievedChunks) {
  const context = retrievedChunks
    .map(
      (chunk) =>
        `Page ${chunk.pageNumber}\n${chunk.text}`
    )
    .join("\n\n");

  const prompt = `
You are an AI assistant that answers questions ONLY using the provided context.

Rules:
1. Answer ONLY from the provided context.
2. If the answer is not present, reply exactly:
"I couldn't find that information in the uploaded PDF."
3. Do NOT make up facts.
4. Keep answers concise and clear.

Context:
${context}

Question:
${question}

Answer:
`;

  const response = await llm.invoke(prompt);

  return response.content;
}

// ------------------------------
// PDF Summary
// ------------------------------
async function generateSummary(retrievedChunks) {
  const context = retrievedChunks.join("\n\n");

  const prompt = `
You are an AI document assistant.

Read the following document and generate a professional summary.

Return the answer in Markdown using this exact structure:

# 📄 Document Summary

## 📌 Overview

(2-3 sentences)

## 📚 Key Topics

- Topic 1
- Topic 2
- Topic 3

## ⭐ Important Points

- Point 1
- Point 2
- Point 3
- Point 4

## ✅ Conclusion

(Short conclusion)

Document:

${context}
`;

  const response = await llm.invoke(prompt);

  return response.content;
}

module.exports = {
  generateAnswer,
  generateSummary,
};