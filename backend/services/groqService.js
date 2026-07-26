const { ChatGroq } = require("@langchain/groq");

const groqModel = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
});

module.exports = groqModel;